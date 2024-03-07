const { Device, User } = require("../models/index");

module.exports = async (req, res, next) => {
   /**
    * --- B1 ---
    * token - no  => login
    *       - yes => session.user - no  => B2
    *                             - yes => token = session.token - no  => B2 + (token = session.token)
    *                                                            - yes => B2
    *
    * --- B2 ---
    * device.login - no  => login (user && delete req.session.user)
    *              - yes => session.user: device.user => next
    */

   let token = req.cookies.token;
   let user = req.session.user;

   if (user && token !== user.token) {
      token = user.token;
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      const expires = new Date(Date.now() + oneYear);
      res.cookie("token", token, { expires });
   }

   const device =
      token &&
      (await Device.findOne({
         where: { token },
         include: {
            model: User,
            as: "user",
         },
      }));

   if (!device || !device.login) {
      user && delete req.session.user;
      return res.redirect("/dang-nhap");
   }

   const { id, name, password } = device.user;
   req.session.user = user = { id, name, password, token };

   await Device.update(
      {
         activity: Date.now(),
      },
      { where: { token } }
   );

   req.username = user.name;

   next();
};
