const Transformer = require("../../core/transformer");
module.exports = class extends Transformer {
   response(instance) {
      return {
         UID: instance.id,
         name: instance.name,
         email: instance.email,
         providerId: instance.provider_id,
         createdAt: instance.created_at,
         updatedAt: instance.updated_at,
      };
   }
}; // Anonymus Class
