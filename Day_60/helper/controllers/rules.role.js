const { Op } = require("sequelize");
const { string } = require("yup");

const nameRole = string()
   .required("Xin vui lòng nhập tên vai trò")
   .max(100, "Tên vai trò chỉ chứa tối đa 100 kí tự");

module.exports = {
   validAddRole: (model) => ({
      nameRole: nameRole.test(
         "check-role-unique",
         "Tên vai trò này đã tồn tại",
         async (name) => {
            const result = await model.findOne({
               where: { name },
            });
            return !result;
         }
      ),
   }),
   validEditRole: (req, model) => ({
      nameRole: nameRole.test(
         "check-role-unique",
         "Tên vai trò này đã tồn tại",
         async (name) => {
            const { id } = req.params;
            const result = await model.findOne({
               where: { name, id: { [Op.ne]: req.params.id } },
            });

            return !result;
         }
      ),
   }),
};
