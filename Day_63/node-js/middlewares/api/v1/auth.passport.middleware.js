module.exports = async (req, res, next) => {
   if (!req.user) {
      return res.err(400, "Bad Request");
   }
   next();
};
