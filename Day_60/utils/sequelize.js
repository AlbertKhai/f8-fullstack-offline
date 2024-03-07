module.exports = {
   createOrUpdate: async (model, where, defaults) => {
      try {
         const [{ dataValues }, created] = await model.findOrCreate({
            where,
            defaults,
         });
         // created: Vừa được tạo
         if (!created) {
            const result = await model.update(defaults, { where });
            if (result) return { action: "update", ...dataValues, ...defaults };
            return null;
         }
         return { action: "create", ...dataValues };
      } catch (error) {
         return null;
      }
   },
};
