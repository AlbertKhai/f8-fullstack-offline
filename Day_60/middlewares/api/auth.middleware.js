const { errorResponse } = require("../../helpers/response");
const { verifyToken } = require("../../utils/jwt");
const { User, Blacklist } = require("../../models/index");

module.exports = async (req, res, next) => {
   const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
   if (!accessToken) return errorResponse(res, 400, "Bad request", errors);

   const blacklist = await Blacklist.findOne({
      where: { token: accessToken ?? "" },
   });

   if (blacklist) return errorResponse(res, 401, "Unauthorize");

   const decode = verifyToken(accessToken);
   if (!decode) return errorResponse(res, 401, "Unauthorize");

   const { userId, exp } = decode;
   const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: "password" },
   });

   if (!user) return errorResponse(res, 401, "Unauthorize");

   req.user = {
      accessToken,
      exp,
      ...user.dataValues,
   };

   return next();
};
