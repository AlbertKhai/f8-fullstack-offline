const bcrypt = require("bcrypt");

const { User } = require("../../../repositories/index");
const { serviceError } = require("../../../helpers/response");
const UserRules = require("../../../helpers/rules/api/v1/rules.user");
const UserTransformer = require("../../../transformers/clients/user.transformer");

module.exports = userService = {
   getUsers: async (query) => {
      try {
         const { users, count } = await User.pagination(query);
         return { users: new UserTransformer(users), count };
      } catch (error) {
         return serviceError(500, "Server Error");
      }
   },
   findUser: async (id) => {
      try {
         const user = await User.findAndAssoc(id, "providers");
         if (!user) return serviceError(400, "User not found");
         return { user };
      } catch (error) {
         return serviceError(500, "Server Error");
      }
   },
   createUser: async (req) => {
      const { error, body } = await UserRules.validAddUser(req.body);

      if (error) return serviceError(...error);

      const user = await User.createLocal({
         name: body.name,
         email: body.email,
         password: bcrypt.hashSync(body.password, 10),
         status: true,
      });

      return { user: new UserTransformer(user) };
   },
   editUser: async (req) => {
      const { id } = req.params;

      try {
         const { error, body } = await UserRules.validEditUser(req.body);
         if (error) return serviceError(...error);
         const result = await User.updateByPk({ name: body.name }, id);
         if (!result[0]) return serviceError(404, "Not found users");
         return {};
      } catch (error) {
         return serviceError(500, "Server Error");
      }
   },
   deleteUser: async (req) => {
      try {
         const result = await User.deleteByPk(req.params.id);
         if (!result) return serviceError(404, "Not found user");
         return {};
      } catch (error) {
         return serviceError(500, "Server Error");
      }
   },
   deleteUsers: async (req) => {
      try {
         const { error, body } = await UserRules.validDeletesUser(req.body);
         if (error) return serviceError(...error);
         const result = await User.delete({ id: body.ids });
         if (!result) return serviceError(404, "Not found users");
         return {};
      } catch (error) {
         return serviceError(500, "Server Error");
      }
   },
};
