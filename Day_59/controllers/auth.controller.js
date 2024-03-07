const { Sequelize } = require("sequelize");
const { User, Device } = require("../models/index");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const bcrypt = require("bcrypt");
const uap = require("ua-parser-js");
const {
   validLogin,
   validRegister,
} = require("../helper/controllers/rules.auth");

module.exports = {
   register: (req, res) => {
      const msg = req.flash("msg");
      return res.render("auth/register", { req, msg });
   },
   handleRegister: async (req, res) => {
      const body = await req.validate(req.body, validRegister(req, User));

      if (body) {
         const password = bcrypt.hashSync(body.password, 10);

         await User.create({
            name: body.name,
            email: body.email,
            password,
         });
         req.flash("msg", "Chúc mừng bạn đã đăng ký thành công");

         if (body.loginRemember === "on") {
            req.flash("old", body);
            req.flash("typeMsg", "bg-success");
            return res.redirect("dang-nhap");
         }
      }
      res.redirect("dang-ky");
   },
   login: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      return res.render("auth/login", { req, msg, typeMsg });
   },
   handleLogin: async (req, res, next) => {
      const body = await req.validate(req.body, validLogin());

      if (body) {
         const user = await User.findOne({
            where: {
               email: {
                  [Sequelize.Op.iLike]: body.email,
               },
            },
            include: {
               model: Device,
               as: "devices",
            },
         });

         if (!user || !bcrypt.compareSync(body.password, user.password)) {
            req.flash("old", body);
            req.flash("typeMsg", "bg-danger");
            req.flash("msg", "Email hoặc mật khẩu không chính xác");
            return res.redirect("/dang-nhap");
         }

         const oneYear = 365 * 24 * 60 * 60 * 1000;
         const expires = new Date(Date.now() + oneYear);

         let token = req.cookies.token;

         const tokenValid = uuidValidate(token);
         const tokenMatch = tokenValid
            ? user.devices.some((item) => item.token === token)
            : false;

         if (!tokenMatch) {
            token = tokenValid ? token : uuidv4();

            var { browser, os } = uap(req.headers["user-agent"]);

            await Device.create({
               user_id: user.id,
               token,
               info: `${os.name}/${browser.name}`,
               login: Date.now(),
               activity: Date.now(),
            });
         } else {
            await Device.update(
               { login: Date.now() },
               { where: { token, user_id: user.id } }
            );
         }

         req.session.user = {
            id: user.id,
            name: user.name,
            password: user.password,
            token,
         };

         res.cookie("token", token, { expires });
         return res.redirect("/user");
      }
      return res.redirect("/dang-nhap");
   },
   handleLogout: async (req, res) => {
      let user = req.session.user;
      await Device.update(
         { login: null, activity: Date.now() },
         { where: { token: user.token, user_id: user.id } }
      );
      delete req.session.user;
      return res.redirect("/dang-nhap");
   },
};
