//Tương ứng với model User
const { UserToken } = require("../models/index");
const Repository = require("../core/repository");
module.exports = new (class extends Repository {
   getModel() {
      return UserToken;
   }

   async save(user_id, refresh_token) {
      let [userToken, created] = await this.findOrCreate({
         where: { user_id },
         defaults: { refresh_token, user_id },
      });

      if (!created) {
         // created = true: có nghĩa là userToken vừa mới được tạo
         // Nếu userToken đã tồn tại và không phải được tạo mới, thì cập nhật
         await this.update({ refresh_token }, { user_id });
      }
   }
})();
