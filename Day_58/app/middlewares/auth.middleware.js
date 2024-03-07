module.exports = async (req, res, next) => {
   const user = req.session.user;
   if (user) return res.redirect("/user");
   next();
};
