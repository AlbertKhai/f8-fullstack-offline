const { string, array, number } = require("yup");
const { User } = require("../../../../repositories/index");
const Rule = require("../../../../core/rule");
const commonRule = require("../../common.rule");

class UserRules extends Rule {
   async validAddUser(input) {
      return this.validate(input, {
         name: commonRule.name,
         email: commonRule.email.test(
            "check-email-unique",
            "Email này đã được sử dụng",
            async (email) => {
               const result = await User.findOne({ email });
               return !result;
            }
         ),
         password: string()
            .required("Vui lòng nhập mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự"),
         passwordVerify: string()
            .required("Vui lòng nhập lại mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự")
            .test(
               "check-password-verify",
               "Mật khẩu nhập lại không khớp",
               (value) => {
                  if (value === "") return true;
                  return value === input.password;
               }
            ),
      });
   }

   validEditUser(input) {
      return this.validate(input, {
         name: commonRule.name,
      });
   }

   validDeletesUser(input) {
      return this.validate(input, {
         ids: array()
            .json()
            .typeError("Danh sách cần xóa phải là 1 mảng")
            .required("Danh sách user cần xóa không được để trống")
            .of(number("Các giá trị trong mảng phải là số"))
            .min(1, "Phải chứa ít nhất 1 giá trị cần xóa"),
      });
   }
}

module.exports = new UserRules();
