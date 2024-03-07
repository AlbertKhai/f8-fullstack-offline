const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
   const token = req.cookies.token;

   if (token) {
      try {
         const user = jwt.verify(token, "f8");
         if (!user.status) throw new Error();
         req.username = user.name;
         return next();
      } catch (err) {
         res.clearCookie("token");
      }
   }

   return res.redirect("/dang-nhap");
};
