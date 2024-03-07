const bcrypt = require("bcrypt");
const passport = require("passport");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const { string } = require("yup");

const sendMail = require("../utils/mail");

const { User, PasswordResetToken, Provider } = require("../models/index");
const {
   validRegister,
   validResetPassword,
} = require("../helper/controllers/rules.auth");

module.exports = {
   login: async (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      res.render("auth/login", {
         req,
         msg,
         typeMsg,
         layout: "layouts/auth",
      });
   },
   handleLogin: passport.authenticate("local", {
      failureRedirect: "/auth/login",
      failureFlash: true,
      badRequestMessage: "Vui lòng nhập đầy đủ email và mật khẩu",
      successRedirect: "/",
   }),
   handleGoogle: passport.authenticate("google", {
      failureFlash: true,
      failureRedirect: "/auth/login",
      successRedirect: "/",
   }),
   register: (req, res) => {
      return res.render("auth/register", { req, layout: "layouts/auth" });
   },
   handleRegister: async (req, res) => {
      const body = await req.validate(req.body, validRegister(req, User));

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
         req.flash("msg", "Chúc mừng bạn đã đăng ký thành công");
         req.flash("typeMsg", "bg-success");
         req.flash("old", body);
         return res.redirect("/auth/login");
      }

      res.redirect("/auth/register");
   },
   forgotPassword: (req, res) => {
      const msg = req.flash("msg");
      const typeMsg = req.flash("typeMsg");
      return res.render("auth/forgot-password", {
         req,
         msg,
         typeMsg,
         layout: "layouts/auth",
      });
   },
   handleForgotPassword: async (req, res) => {
      let user;
      const body = await req.validate(req.body, {
         email: string()
            .required("Xin vui lòng nhập email")
            .max(100, "Email chỉ chứa tối đa 100 kí tự")
            .matches(
               /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
               {
                  message: "Xin vui lòng nhập đúng định dạng email",
                  excludeEmptyString: true,
               }
            )
            .test(
               "check-email-unique",
               "Email này không tồn tại trong hệ thống",
               async (email) => {
                  if (!email.trim()) return true;
                  user = await User.findOne({ where: { email } });
                  return user;
               }
            ),
      });

      if (body) {
         const token = uuidv4();
         const [passResetToken] = await PasswordResetToken.findOrCreate({
            where: { user_id: user.id },
            defaults: {
               token,
               user_id: user.id,
            },
         });

         await sendMail(
            body.email,
            "Quên mật khẩu",
            `<h1 style="color: black;">Bấm vào nút <strong style="color: #0D6EFD;">"Đổi mật khẩu"</strong> để đặt lại mật khẩu mới</h1>
            <a rel="noopener" target="_blank" href="${process.env.URL}/auth/reset-password/${passResetToken.token}" style="background-color: #0D6EFD; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 14px 20px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;">
               <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt;">&nbsp;</i>
               <span style="mso-text-raise: 15pt;">Đổi mật khẩu &rarr;</span>
               <i style="letter-spacing: 25px; mso-font-width: -100%;">&nbsp;</i>
            </a>
            <p style="color: red;">⚠️ Liên kết đổi mật khẩu chỉ tồn tại trong <strong>15 phút</strong></p>
            `
         );
         req.flash(
            "msg",
            `Đã gửi link đặt lại mật khẩu tới email: ${body.email}`
         );
         req.flash("typeMsg", "bg-success");
         return res.redirect("/auth/login");
      }
      res.redirect("/auth/forgot-password");
   },
   resetPassword: async (req, res, next) => {
      const { token } = req.params;
      let passResetToken =
         uuidValidate(token) &&
         (await PasswordResetToken.findOne({
            where: { token },
         }));

      if (!passResetToken) return res.render("not-found");

      if (new Date() - passResetToken.created_at > 15 * 60 * 1000) {
         await PasswordResetToken.destroy({ where: { token } });
         req.flash("msg", `Liên kết đặt lại mật khẩu đã hết hạn`);
         req.flash("typeMsg", "bg-danger");
         return res.redirect("/auth/forgot-password");
      }

      res.render(`auth/reset-password`, {
         req,
         layout: "layouts/auth",
      });
   },
   handleResetPassword: async (req, res) => {
      const { token } = req.params;

      const passResetToken =
         uuidValidate(token) &&
         (await PasswordResetToken.findOne({
            where: { token },
         }));

      if (!passResetToken) return res.render("not-found");

      if (new Date() - passResetToken.created_at > 15 * 60 * 1000) {
         await PasswordResetToken.destroy({ where: { token } });
         req.flash("msg", `Liên kết đặt lại mật khẩu đã hết hạn`);
         req.flash("typeMsg", "bg-danger");
         return res.redirect("/auth/forgot-password");
      }

      const body = await req.validate(req.body, validResetPassword(req));

      if (body) {
         const password = bcrypt.hashSync(body.password, 10);

         await User.update(
            { password },
            { where: { id: passResetToken.user_id } }
         );

         await PasswordResetToken.destroy({ where: { token } });

         req.flash("msg", "Đổi mật khẩu thành công");
         req.flash("typeMsg", "bg-success");
         return res.redirect("/auth/login");
      }

      res.render(`auth/reset-password`, { req, layout: "layouts/auth" });
   },
   logout: (req, res) => {
      req.logout((error) => {
         if (!error) return res.redirect("/auth/login");
      });
   },
};
