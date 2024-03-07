const { User } = require("../../../models/index");

const {
   getUsers,
   findUser,
   createUser,
   editUser,
   deleteUser,
   deleteUsers,
} = require("../../../services/api/v1/user.service");

module.exports = {
   index: async (req, res) => {
      const { error, count, users } = await getUsers(req.query);

      if (error) return res.err(...error);

      return res.success(200, "Success", users, { count });
   },
   find: async (req, res) => {
      const { id } = req.params;

      const { error, user } = await findUser(id);

      if (error) return res.err(...error);

      return res.success(200, "Success", user);
   },

   store: async (req, res) => {
      const { error, user } = await createUser(req);

      if (error) return res.err(...error);

      return res.success(201, "Success", user);
   },

   editStore: async (req, res) => {
      const { error } = await editUser(req);

      if (error) return res.err(...error);

      return res.success(200, "Success");
   },

   delete: async (req, res) => {
      const { error } = await deleteUser(req);

      if (error) return res.err(...error);

      return res.success(200, "Success");
   },

   deletes: async (req, res) => {
      const { error } = await deleteUsers(req);

      if (error) return res.err(...error);

      return res.success(200, "Success");
   },
};
