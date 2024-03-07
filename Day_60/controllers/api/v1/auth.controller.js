const { successResponse, errorResponse } = require("../../../helpers/response");
const { User, Blacklist, UserToken } = require("../../../models/index");
const bcrypt = require("bcrypt");
const {
   createAccessToken,
   verifyToken,
   createRefreshToken,
} = require("../../../utils/jwt");

const { createOrUpdate } = require("../../../utils/sequelize");

module.exports = {
   login: async (req, res) => {
      const { email, password } = req.body;

      // 1. validate
      if (!email || !password) {
         return errorResponse(
            res,
            400,
            "Bad Request",
            "Vui lòng nhập email và mật khẩu"
         );
      }

      // 2. unique email
      const user = await User.findOne({ where: { email } });
      if (!user) {
         return errorResponse(res, 400, "Bad Request", {
            email: "Email không tồn tại",
         });
      }

      // 3. lấy password hash
      const { password: hash } = user;

      // 4. so sánh password hash với password từ req
      if (!bcrypt.compareSync(password, hash)) {
         return errorResponse(res, 400, "Bad Request", {
            password: "Password không chính xác",
         });
      }

      // 5. Tạo token bằng JWT
      const accessToken = createAccessToken({ userId: user.id });
      const refreshToken = createRefreshToken();

      if (!accessToken || !refreshToken) {
         return errorResponse(res, 500, "Server Error");
      }
      // 6. Trả về res

      // Thêm refresh token vào db
      await createOrUpdate(
         UserToken,
         { user_id: user.id },
         { refresh_token: refreshToken, user_id: user.id }
      );

      return successResponse(res, 200, "Success", {
         accessToken,
         refreshToken,
      });
   },
   profile: async (req, res) => {
      return successResponse(res, 200, "Success", req.user);
   },
   logout: async (req, res) => {
      const { accessToken, exp } = req.user;
      const [blacklist] = await Blacklist.findOrCreate({
         where: { token: accessToken },
         defaults: { token: accessToken, expired: exp },
      });

      if (blacklist) {
         return successResponse(res, 200, "Success");
      }

      return errorResponse(res, 500, "Server Error");
   },
   refresh: async (req, res) => {
      const { refreshToken } = req.body;

      if (!refreshToken) return errorResponse(res, 400, "Bad Request");

      const userToken = await UserToken.findOne({
         where: { refresh_token: refreshToken },
      });

      if (!userToken) return errorResponse(res, 400, "Bad Request");

      // Nếu tồn tại trong DB => Lấy userId
      const { user_id: userId } = userToken;

      // Kiểm tra refresh token hết hạn
      const decode = verifyToken(refreshToken);
      if (!decode) return errorResponse(res, 401, "Unauthorize");

      // Khởi tạo accessToken mới
      const accessToken = createAccessToken({ userId });

      // Trả về response
      if (!accessToken) return errorResponse(res, 500, "Server Error");

      return successResponse(res, 200, "Success", {
         accessToken,
         refreshToken,
      });
   },
};
