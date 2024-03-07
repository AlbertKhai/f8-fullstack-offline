const { verifyToken } = require("../../../utils/jwt");
const { User, Blacklist, Provider } = require("../../../models/index");

module.exports = async (req, res, next) => {
   const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
   if (!accessToken) return res.err(401, "Unauthorize");

   const blacklist = await Blacklist.findOne({
      where: { token: accessToken },
   });

   if (blacklist) return res.err(401, "Unauthorize");

   const decode = verifyToken(accessToken);
   if (!decode) return res.err(401, "Unauthorize");

   const { userId, exp } = decode;

   const user = await User.findOne({
      where: { id: userId },
      include: {
         model: Provider,
         as: "providers",
      },
      attributes: { exclude: "password" },
   });

   if (!user || !user.status) {
      return res.err(401, "Unauthorize");
   }

   req.user = {
      accessToken,
      exp,
      ...user.dataValues,
   };

   return next();
};
