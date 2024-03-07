const { User, Device } = require("../models/index");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const dayjs_vi = require("dayjs/locale/vi");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("lodash");

const {
   validEdit,
   validChangePass,
} = require("../helper/controllers/rules.user");

module.exports = {
   index: (req, res) => {
      const msg = req.flash("msg");
      return res.render("user/index", {
         req,
         msg,
         layout: "layouts/layout-user",
      });
   },
   edit: async (req, res, next) => {
      const msg = req.flash("msg");
      const { id } = req.session.user;

      try {
         if (_.isEmpty(req.old)) {
            const user = await User.findByPk(id);
            req.old = user;
         }
         res.render("user/edit", { req, msg, layout: "layouts/layout-user" });
      } catch (error) {
         next(error);
      }
   },
   handleEdit: async (req, res) => {
      const { id } = req.session.user;
      const body = await req.validate(req.body, validEdit(id, User));

      if (body) {
         await User.update(
            {
               name: body.name,
               email: body.email,
            },
            {
               where: { id },
            }
         );

         req.flash("msg", "Cập nhật thành công");
      }

      res.redirect("/user/edit");
   },
   changePass: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      res.render("user/changePass", {
         req,
         msg,
         typeMsg,
         layout: "layouts/layout-user",
      });
   },
   handleChangePass: async (req, res) => {
      const { id, password } = req.session.user;
      const body = await req.validate(req.body, validChangePass(req));

      if (body) {
         const validPass = bcrypt.compareSync(body.passOld, password);

         req.flash(
            "msg",
            validPass
               ? "Đổi mật khẩu thành công, bạn vui lòng đăng nhập lại nhé"
               : "Mật khẩu cũ không chính xác"
         );

         req.flash("typeMsg", validPass ? "bg-success" : "bg-danger");

         if (validPass) {
            const password = bcrypt.hashSync(body.passNew, 10);
            await User.update({ password }, { where: { id } });
            await Device.update({ login: null }, { where: { user_id: id } });
         } else {
            req.flash("old", body);
         }
      }

      res.redirect("/user/changePass");
   },
   devices: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      const { id, token: tokenCurrent } = req.session.user;
      let devices = await Device.findAll({ where: { user_id: id } });
      devices = devices.map(({ id, info, activity, token, login }) => {
         dayjs.extend(relativeTime);

         return {
            id,
            info,
            login,
            activity: dayjs(activity).locale(dayjs_vi).fromNow(),
            current: token === tokenCurrent,
         };
      });
      devices.sort((a, b) => b.current - a.current);

      res.render("user/devices", {
         req,
         msg,
         typeMsg,
         devices,
         layout: "layouts/layout-user",
      });
   },
   handleDevices: async (req, res) => {
      let { device } = req.body;
      device = device.split("|");
      let status = await Device.update(
         { login: null, activity: Date.now() },
         { where: { id: +device[0] } }
      );
      status = status[0] === 1;

      req.flash(
         "msg",
         status
            ? `Đăng xuất thành công thiết bị ${device[1]}`
            : `Đăng xuất thiết bị không thành công`
      );

      req.flash("typeMsg", status ? "bg-success" : "bg-danger");
      res.redirect("/user/devices");
   },
};
