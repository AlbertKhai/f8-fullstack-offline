const { Role, Permission } = require("../models/index");
const {
   validAddRole,
   validEditRole,
} = require("../helper/controllers/rules.role");

module.exports = {
   index: async (req, res) => {
      try {
         // Lấy trang hiện tại
         const { page = 1 } = req.query;
         const limit = 7;
         // Tính offset
         const offset = (page - 1) * limit;

         const { count, rows: roles } = await Role.findAndCountAll({
            limit,
            offset,
         });

         //  Tổng số trang  = Math.ceil(tổng số bản ghi / limit)
         const totalPage = Math.ceil(count / limit);
         const msg = req.flash("msg");
         const typeMsg = req.flash("typeMsg");
         res.render("roles/index", {
            roles,
            totalPage,
            page,
            offset,
            msg,
            typeMsg,
            req,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found", { layout: "layouts/error" });
      }
   },
   add: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      const permissions = await Permission.findAll();
      res.render("roles/add", {
         req,
         permissions,
         msg,
         typeMsg,
         layout: "layouts/modules",
      });
   },
   handleAdd: async (req, res) => {
      const body = await req.validate(req.body, validAddRole(Role));

      if (body) {
         const role = await Role.create({ name: body.nameRole });

         if (role) {
            const permissions = Array.isArray(body.permissions)
               ? body.permissions
               : [body.permissions];

            if (permissions.length) {
               const permissionsInstance = await Promise.all(
                  permissions.map((permissionId) =>
                     Permission.findByPk(permissionId)
                  )
               );

               await role.addPermissions(permissionsInstance);

               req.flash("msg", `Đã thêm thành công vai trò: ${body.nameRole}`);
               req.flash("typeMsg", "bg-success");
            }
         }

         return res.redirect("/roles");
      }
      res.redirect("/roles/add");
   },
   edit: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      const { id } = req.params;
      try {
         const roleEditing = await Role.findOne({
            where: { id },
            include: {
               model: Permission,
               as: "permissions",
            },
         });

         const permissionsEditing = (await roleEditing.getPermissions()).map(
            (permission) => permission.id
         );

         const roles = await Role.findAll();
         const permissions = await Permission.findAll();

         res.render("roles/edit", {
            req,
            msg,
            typeMsg,
            roles,
            permissions,
            roleEditing,
            permissionsEditing,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found", { req, layout: "layouts/error" });
      }
   },
   handleEdit: async (req, res) => {
      const { id } = req.params;
      const body = await req.validate(req.body, validEditRole(req, Role));

      if (body) {
         const status = await Role.update(
            { name: body.nameRole },
            { where: { id } }
         );

         if (status[0]) {
            const permissions = Array.isArray(body.permissions)
               ? body.permissions
               : [body.permissions];

            if (permissions.length) {
               const permissionsInstance = await Promise.all(
                  permissions.map((permissionId) =>
                     Permission.findByPk(permissionId)
                  )
               );

               const role = await Role.findByPk(id);

               await role.setPermissions(permissionsInstance);

               req.flash(
                  "msg",
                  `Cập nhật thành công vai trò: ${body.nameRole}`
               );
               req.flash("typeMsg", "bg-success");
            }
         }
      }
      res.redirect("/roles/edit/" + id);
   },
   handleDelete: async (req, res) => {
      const { id } = req.params;
      await Role.destroy({ where: { id } });

      req.flash("msg", `Đã xóa vai trò: ${req.body.nameRole}`);
      req.flash("typeMsg", "bg-success");
      res.redirect("/roles");
   },
};
