const { string } = require("yup");
const { Op } = require("sequelize");

module.exports = {
   validEdit: (id, model) => ({
      name: string().required("Tên bắt buộc phải nhập"),
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
            "check-unique",
            "Email đã tồn tại trên hệ thống",
            async (email) => {
               const result = await model.findOne({
                  where: { email, id: { [Op.ne]: id } },
               });
               return !result;
            }
         ),
   }),
   validChangePass: (req) => ({
      passOld: string()
         .required("Xin vui lòng nhập mật khẩu hiện tại")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự"),
      passNew: string()
         .required("Xin vui lòng nhập mật khẩu mới")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự")
         .test(
            "check-passOld",
            "Xin vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại",
            (value) => {
               if (value === "") return true;
               return value !== req.body.passOld;
            }
         ),
      passVerify: string()
         .required("Xin vui lòng nhập lại mật khẩu mới")
         .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự")
         .test(
            "check-passVerify",
            "Mật khẩu mới nhập lại không khớp",
            (value) => {
               if (value === "") return true;
               return value === req.body.passNew;
            }
         ),
   }),
};
