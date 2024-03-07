const { string } = require("yup");
const { checkShortendUrl } = require("../../utils/shortenUrl");

const password = string()
   .matches(/\w{4,}/, {
      message: "Mật khẩu tối thiểu 4 kí tự.",
      excludeEmptyString: true,
   })
   .max(16, "Mật khẩu chỉ chứa tối đa 16 kí tự.");

module.exports = {
   validShortenUrl: (model) => ({
      url: string()
         .required("Vui lòng nhập liên kết.")
         .url("Vui lòng nhập liên kết hợp lệ.")
         .test(
            "check-shortend-url",
            "Vui lòng nhập một liên kết chưa rút gọn.",
            async (value) => {
               if (!value) return true;
               const regex = `${process.env.URL}/short-url/w{3,}`;
               return !checkShortendUrl(value, regex);
            }
         ),

      customID: string()
         .matches(/\w{3,}/, {
            message: "ID tối thiểu 3 kí tự",
            excludeEmptyString: true,
         })
         .max(10, "ID chỉ chứa tối đa 10 kí tự.")
         .test("ID-unique", "ID này đã tồn tại.", async (value) => {
            if (!value) return true;
            const result = await model.findOne({
               where: { shorten_url: value },
            });
            return !result;
         }),

      password,
   }),
   validEditShortenUrl: () => ({ password }),
   validPasswordUrl: () => ({
      password: password.required("Vui lòng nhập mật khẩu"),
   }),
};
