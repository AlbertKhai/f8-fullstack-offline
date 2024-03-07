const Transformer = require("../../core/transformer");
module.exports = class extends Transformer {
   response(instance) {
      // console.log("🚀 ~ extends ~ response ~ instance:", instance);
      return {
         UID: instance.id,
         name: instance.name,
         email: instance.email,
         status: instance.status,
         statusText: instance.status ? "Kích hoạt" : "Chưa kích hoạt",
         avatarUrl: instance.avatar_url,
         providers: instance.providers?.map(({ id, name }) => ({
            UID: id,
            name,
         })),
         createdAt: instance.created_at,
         updatedAt: instance.updated_at,
      };
   }
};
