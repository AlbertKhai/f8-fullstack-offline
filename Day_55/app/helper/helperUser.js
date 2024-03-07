const userModel = require("../models/user");
const { object, string } = require("yup");

module.exports = {
    getSchema: (id = null) => {
        return object({
            email: string()
                .required("Email bắt buộc phải nhập")
                .email("Email không đúng định dạng")
                .test("emailExist", "Email này đã tồn tại", async (value) => {
                    return (
                        (await userModel.checkDuplicateEmail(value, id))
                            .length === 0
                    );
                }),
            name: string()
                .min(2, "Tên phải từ 2 ký tự")
                .required("Tên bắt buộc phải nhập"),
        });
    },
};
