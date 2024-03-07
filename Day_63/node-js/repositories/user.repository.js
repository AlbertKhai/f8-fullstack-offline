const { User, Provider } = require("../models/index");
const Repository = require("../core/repository");
const { Op } = require("sequelize");
module.exports = new (class extends Repository {
   getModel() {
      return User;
   }

   async pagination({ sort = "id", order = "desc", q, status, page, limit }) {
      const filter = {};

      if (status === "true" || status === "false") {
         filter.status = status === "true";
      }

      if (q) {
         filter[Op.or] = {
            name: { [Op.iLike]: `%${q}%` },
            email: { [Op.iLike]: `%${q}%` },
         };
      }

      const options = {
         order: [[sort, order]],
         attributes: { exclude: "password" },
         where: filter,
      };

      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
         const offset = (page - 1) * limit;
         options.limit = limit;
         options.offset = offset;
      }

      const { count, rows: users } = await this.findAndCountAll(options);
      return { users, count };
   }

   findAndAssoc(id, include) {
      const options = {};
      switch (include) {
         case "providers":
            options.include = {
               model: Provider,
               as: include,
            };
            break;

         default:
            break;
      }

      return this.findByPk(id, options);
   }

   async createLocal(data) {
      const user = await this.create(data);
      user.providers = [await user.createProvider({ name: "email" })];
      return user;
   }
})();
