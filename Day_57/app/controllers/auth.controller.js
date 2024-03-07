const { Sequelize } = require("sequelize");
const { User } = require("../models/index");
const { string } = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   register: (req, res) => {
      const msg = req.flash("msg");
      return res.render("auth/register", { req, msg });
   },
   handleRegister: async (req, res) => {
      const body = await req.validate(req.body, {
         name: string()
            .required("Xin vui lòng nhập tên của bạn")
            .max(50, "Tên chỉ chứa tối đa 50 kí tự"),
         email: string()
            .required("Xin vui lòng nhập email")
            .email("Xin vui lòng nhập đúng định dạng email")
            .max(100, "Email chỉ chứa tối đa 100 kí tự")
            .test(
               "check-email-unique",
               "Email này đã được sử dụng",
               async (email) => {
                  const result = await User.findOne({ where: { email } });
                  return !result;
               }
            ),
         password: string()
            .required("Xin vui lòng nhập mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự"),
         passwordVerify: string()
            .required("Xin vui lòng nhập lại mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự")
            .test(
               "check-password-verify",
               "Mật khẩu nhập lại không khớp",
               (value) => {
                  if (value === "") return true;
                  return value === req.body.password;
               }
            ),
      });

      if (body) {
         const password = bcrypt.hashSync(body.password, 10);

         await User.create({
            name: body.name,
            email: body.email,
            password,
            status: false,
         });
         req.flash("msg", "Chúc mừng bạn đã đăng ký thành công");

         if (body.loginRemember === "on") {
            req.flash("old", body);
            req.flash("alertSuccess", "alert-success");
            return res.redirect("dang-nhap");
         }
      }
      res.redirect("dang-ky");
   },
   login: (req, res) => {
      const msg = req.flash("msg");
      const alertSuccess = req.flash("alertSuccess")[0];
      return res.render("auth/login", { req, msg, alertSuccess });
   },
   handleLogin: async (req, res, next) => {
      const body = await req.validate(req.body, {
         email: string()
            .required("Xin vui lòng nhập email")
            .email("Xin vui lòng nhập đúng định dạng email")
            .max(100, "Email chỉ chứa tối đa 100 kí tự"),
         password: string()
            .required("Xin vui lòng nhập mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự"),
      });

      if (body) {
         const user = await User.findOne({
            where: {
               email: {
                  [Sequelize.Op.iLike]: body.email,
               },
            },
         });

         if (!user || !bcrypt.compareSync(body.password, user.password)) {
            req.flash("old", body);
            req.flash("msg", "Email hoặc mật khẩu không chính xác");
            return res.redirect("/dang-nhap");
         }

         await User.update({ status: true }, { where: { id: user.id } });

         const oneYear = 365 * 24 * 60 * 60 * 1000;
         const expires = new Date(Date.now() + oneYear);

         // Tạo token JWT
         const token = jwt.sign(
            { id: user.id, name: user.name, status: true },
            "f8"
         );

         // Lưu trữ token trong cookie
         res.cookie("token", token, { expires });
         return res.redirect("/");
      }
      return res.redirect("/dang-nhap");
   },
   handleLogout: async (req, res) => {
      const token = req.cookies.token;
      if (token) {
         try {
            const user = jwt.verify(req.cookies.token, "f8");
            await User.update({ status: false }, { where: { id: user.id } });
         } catch (error) {}
         res.clearCookie("token");
      }
      return res.redirect("/dang-nhap");
   },
};
