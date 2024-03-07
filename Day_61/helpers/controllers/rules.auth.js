const { string } = require("yup");

module.exports = {
   validRegister: (req, model) => ({
      name: string()
         .required("Vui lòng nhập tên của bạn.")
         .max(50, "Tên chỉ chứa tối đa 50 kí tự."),
      email: string()
         .required("Vui lòng nhập email.")
         .max(100, "Email chỉ chứa tối đa 100 kí tự.")
         .matches(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            {
               message: "Vui lòng nhập đúng định dạng email.",
               excludeEmptyString: true,
            }
         )
         .test(
            "check-email-unique.",
            "Email này đã được sử dụng.",
            async (email) => {
               const result = await model.findOne({ where: { email } });
               return !result;
            }
         ),
      password: string()
         .required("Vui lòng nhập mật khẩu.")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự."),
      passwordVerify: string()
         .required("Vui lòng nhập lại mật khẩu.")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự.")
         .test(
            "check-password-verify",
            "Mật khẩu nhập lại không khớp.",
            (value) => {
               if (value === "") return true;
               return value === req.body.password;
            }
         ),
   }),
   validResetPassword: (req) => ({
      password: string()
         .required("Vui lòng nhập mật khẩu mới.")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự."),
      passwordVerify: string()
         .required("Vui lòng nhập lại mật khẩu mới.")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự.")
         .test(
            "check-password-verify",
            "Mật khẩu nhập lại không khớp.",
            (value) => {
               if (value === "") return true;
               return value === req.body.password;
            }
         ),
   }),
};
