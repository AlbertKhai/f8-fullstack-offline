const { Sequelize } = require("sequelize");
const { User } = require("../models/index");
const { string } = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   login: (req, res) => {
      const msg = req.flash("msg");
      return res.render("auth/login", { req, msg });
   },
   handleLogin: async (req, res, next) => {
      const body = await req.validate(req.body, {
         password: string().required("Mật khẩu bắt buộc phải nhập"),
         email: string()
            .required("Email bắt buộc phải nhập")
            .email("Email không đúng định dạng"),
      });

      if (body) {
         const user = await User.findOne({
            where: {
               email: {
                  [Sequelize.Op.iLike]: body.email,
               },
            },
         });

         const pass = bcrypt.compareSync(body.password, user.password);

         if (pass) {
            const oneYear = 365 * 24 * 60 * 60 * 1000;
            const expires = new Date(Date.now() + oneYear);

            // Tạo token JWT
            const token = jwt.sign({ id: user.id }, "admin", {
               expiresIn: "1h",
            });

            // Lưu trữ token trong cookie
            res.cookie("token", token, { expires });

            return res.redirect("/");
         } else {
            delete body.password;
            req.flash("old", body);
            req.flash("msg", "Email hoặc mật khẩu không chính xác");
         }
      }
      return res.redirect("/dang-nhap");
   },
   handleLogout: async (req, res) => {
      res.clearCookie("token");
      return res.redirect("/dang-nhap");
   },
};
