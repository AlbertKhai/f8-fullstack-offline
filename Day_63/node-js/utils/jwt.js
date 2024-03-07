const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRE, JWT_REFRESH_TOKEN_EXPIRE } =
   process.env;

module.exports = {
   createAccessToken: (data) => {
      try {
         return jwt.sign(data, JWT_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRE,
         });
      } catch (error) {
         return false;
      }
   },
   createRefreshToken: () => {
      try {
         return jwt.sign(
            { value: Math.random() + new Date().getTime() },
            JWT_SECRET,
            {
               expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
            }
         );
      } catch (error) {
         return false;
      }
   },
   verifyToken: (token) => {
      try {
         return jwt.verify(token, JWT_SECRET);
      } catch (error) {
         return false;
      }
   },
};
