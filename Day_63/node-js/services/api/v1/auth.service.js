const bcrypt = require("bcrypt");
const { serviceError } = require("../../../helpers/response");

const {
   createAccessToken,
   createRefreshToken,
   verifyToken,
} = require("../../../utils/jwt");

const { UserToken, User, Blacklist } = require("../../../repositories/index");

module.exports = authService = {
   createJWtToken: async (userId) => {
      const accessToken = createAccessToken({ userId });
      const refreshToken = createRefreshToken();

      if (accessToken && refreshToken) {
         await UserToken.save(userId, refreshToken);
      }

      return { accessToken, refreshToken };
   },

   refreshJwtToken: async ({ refreshToken }) => {
      if (!refreshToken) return serviceError(400, "Bad Request");

      const userToken = await UserToken.findOne({ refreshToken });

      if (!userToken) return serviceError(400, "Bad Request");

      // Kiểm tra refresh token hết hạn
      const decode = verifyToken(refreshToken);
      if (!decode) return serviceError(401, "Unauthorize");

      // Khởi tạo accessToken mới
      const accessToken = createAccessToken({ userId: userToken.user_id });

      // Trả về response
      if (!accessToken) return serviceError(500, "Server Error");

      return { accessToken, refreshToken };
   },

   loginLocal: async ({ email, password }) => {
      if (!email || !password) {
         return serviceError(
            400,
            "Bad Request",
            "Vui lòng nhập đầy đủ email và mật khẩu"
         );
      }

      const user = await User.findOne({ email });
      if (!user) {
         return serviceError(400, "Bad Request", {
            email: "Email hoặc mật khẩu không chính xác",
         });
      }

      if (!bcrypt.compareSync(password, user.password)) {
         return serviceError(400, "Bad Request", {
            password: "Email hoặc mật khẩu không chính xác",
         });
      }

      return await authService.createJWtToken(user.id);
   },

   logout: async ({ accessToken, exp }) => {
      return await Blacklist.save(accessToken, exp);
   },

   getAuthRedirectUrl: (res) => {
      let redirectURl = null;

      // Ghi đè phương thức setHeader để bắt header Location
      const originalSetHeader = res.setHeader;
      res.setHeader = function (name, value) {
         if (name.toLowerCase() === "location") {
            redirectURl = value; // Lưu giữ URL chuyển hướng
            return; // Không set header Location thực sự để ngăn chuyển hướng
         }
         originalSetHeader.apply(res, [name, value]);
      };

      // Lưu lại phương thức end gốc
      const originalEnd = res.end;

      // Ghi đè phương thức end tạm thời
      res.end = function (...arg) {
         // Khôi phục phương thức end gốc
         res.end = originalEnd;

         if (redirectURl) {
            // Nếu có URL chuyển hướng, trả về dưới dạng JSON
            res.setHeader("Content-Type", "application/json");
            res.json({ urlRedirect: redirectURl });
         } else {
            // Nếu không có URL chuyển hướng, gọi phương thức end gốc
            res.end(arg);
         }
      };

      return res;
   },
};
