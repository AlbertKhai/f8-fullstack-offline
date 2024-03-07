const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, Provider, Role } = require("../models/index");
const {
   validAddUser,
   validEditUser,
} = require("../helper/controllers/rules.user");

module.exports = {
   index: async (req, res) => {
      try {
         // Lấy trang hiện tại
         const { page = 1 } = req.query;
         const limit = 6;
         // Tính offset
         const offset = (page - 1) * limit;
         const orderBy = req.flash("orderBy");

         const { count, rows: users } = await User.findAndCountAll({
            limit,
            offset,
            order: [["id", orderBy[0] ?? "asc"]],
         });

         //  Tổng số trang  = Math.ceil(tổng số bản ghi / limit)
         const totalPage = Math.ceil(count / limit);

         const msg = req.flash("msg");
         const typeMsg = req.flash("typeMsg");
         res.render("users/index", {
            users,
            totalPage,
            page,
            offset,
            msg,
            typeMsg,
            req,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found");
      }
   },
   add: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      res.render("users/add", {
         req,
         msg,
         typeMsg,
         layout: "layouts/modules",
      });
   },
   handleAdd: async (req, res) => {
      const body = await req.validate(req.body, validAddUser(req, User));

      if (body) {
         const password = bcrypt.hashSync(body.password, 10);

         const [provider] = await Provider.findOrCreate({
            where: { name: "email" },
            defaults: { name: "email" },
         });

         await User.create({
            name: body.name,
            email: body.email,
            password,
            provider_id: provider.id,
         });

         req.flash("msg", `Thêm thành công người dùng: ${body.name}`);
         req.flash("typeMsg", "bg-success");
         req.flash("orderBy", "desc");

         return res.redirect("/users");
      }

      res.redirect("/users/add");
   },
   edit: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");

      try {
         if (_.isEmpty(req.old)) {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.render("not-found");
            req.old = user;
         }

         res.render("users/edit", {
            req,
            msg,
            typeMsg,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found");
      }
   },
   handleEdit: async (req, res) => {
      const { id } = req.params;
      const body = await req.validate(req.body, validEditUser(req, User));

      if (body) {
         await User.update(
            {
               name: body.name,
               email: body.email,
            },
            { where: { id } }
         );

         req.flash("msg", "Cập nhật thông tin người dùng thành công");
         req.flash("typeMsg", "bg-success");
      }

      res.redirect(`/users/edit/${id}`);
   },
   handleDelete: async (req, res) => {
      const { id } = req.params;
      await User.destroy({ where: { id } });

      req.flash("msg", `Đã xóa người dùng: ${req.body.username}`);
      req.flash("typeMsg", "bg-success");
      res.redirect("/users");
   },
   role: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");

      try {
         if (_.isEmpty(req.old)) {
            req.old = await User.findOne({
               where: { id: req.params.id },
               include: {
                  model: Role,
                  as: "roles",
               },
            });

            if (!req.old) return res.render("not-found");
         }

         // Lấy trang hiện tại
         const { page = 1 } = req.query;
         const limit = 6;
         // Tính offset
         const offset = (page - 1) * limit;

         const { count, rows: roles } = await Role.findAndCountAll({
            limit,
            offset,
         });

         //  Tổng số trang  = Math.ceil(tổng số bản ghi / limit)
         const totalPage = Math.ceil(count / limit);

         res.render("users/role", {
            req,
            msg,
            typeMsg,
            roles,
            page,
            totalPage,
            layout: "layouts/modules",
         });
      } catch (error) {
         res.render("not-found");
      }
   },
   handleRole: async (req, res) => {
      const { id } = req.params;
      const { roles } = req.body;

      const user = await User.findByPk(id);

      if (user) {
         const userRoles = Array.isArray(roles) ? roles : [roles];

         if (userRoles.length) {
            const rolesInstance = await Promise.all(
               userRoles.map((roleId) => Role.findByPk(roleId))
            );

            await user.setRoles(rolesInstance);

            req.flash("msg", `Cập nhật phân quyền thành công`);
            req.flash("typeMsg", "bg-success");
         }
      }

      res.redirect(`/users/role/${id}`);
   },
};
