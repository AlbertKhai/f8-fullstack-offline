const { string } = require("yup");

module.exports = {
   name: string()
      .required("Vui lòng nhập tên của bạn")
      .max(50, "Tên chỉ chứa tối đa 50 kí tự"),

   email: string()
      .required("Vui lòng nhập email")
      .max(100, "Email chỉ chứa tối đa 100 kí tự")
      .matches(
         /(([^<>()\[\]\\.,;:\s+@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm,
         {
            message: "Vui lòng nhập đúng định dạng email",
            excludeEmptyString: true,
         }
      ),
};
