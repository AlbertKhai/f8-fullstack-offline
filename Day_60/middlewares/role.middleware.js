const { User, Role, Permission } = require("../models/index");

module.exports = async (req, res, next) => {
   const user = await User.findOne({
      where: { id: req.user.id },
      include: {
         model: Role,
         as: "roles",
         include: {
            model: Permission,
            as: "permissions",
         },
      },
   });

   const permissions = user.roles.reduce((prev, { permissions }) => {
      prev = [...permissions.map(({ name }) => name)];
      return prev;
   }, []);

   let role;

   switch (true) {
      case /^(\/$|\/\?page)/.test(req.url):
         role = "readRoles";
         req.flash("permissions", permissions);
         break;
      case /^\/(edit|add|delete)/.test(req.url):
         role = /^\/(\w*)/.exec(req.url)[1] + "Roles";
         break;
      case /^\/role/.test(req.url):
         role = "editRoles";
         break;
   }

   if (!permissions.includes(role)) {
      return res.render("not-access", { req, layout: "layouts/error" });
   }
   next();
};
