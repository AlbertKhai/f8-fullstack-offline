const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
      return res.redirect("/dang-nhap");
   }

   try {
      // Xác minh token
      jwt.verify(token, "admin");
      next();
   } catch (err) {
      res.clearCookie("token");
      return res.redirect("/dang-nhap");
   }
};
