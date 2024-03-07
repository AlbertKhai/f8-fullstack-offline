const { string } = require("yup");
const { Op } = require("sequelize");

const name = string()
   .required("Xin vui lòng nhập tên của bạn")
   .max(50, "Tên chỉ chứa tối đa 50 kí tự");

const email = string()
   .required("Xin vui lòng nhập email")
   .max(100, "Email chỉ chứa tối đa 100 kí tự")
   .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      {
         message: "Xin vui lòng nhập đúng định dạng email",
         excludeEmptyString: true,
      }
   );

module.exports = {
   validAddUser: (req, model) => ({
      name,
      email: email.test(
         "check-email-unique",
         "Email này đã được sử dụng",
         async (email) => {
            const result = await model.findOne({ where: { email } });
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
   }),
   validEditUser: (req, model) => ({
      name,
      email: email.test(
         "check-email-unique",
         "Email này đã được sử dụng",
         async (email) => {
            const result = await model.findOne({
               where: { email, id: { [Op.ne]: req.params.id } },
            });
            return !result;
         }
      ),
   }),
};
