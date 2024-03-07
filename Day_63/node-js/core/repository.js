//Base Repository
module.exports = class {
   constructor() {
      this.model = this.getModel();
   }

   findByPk(id, options = {}) {
      return this.model.findByPk(id, options);
   }

   findOne(conditions = {}, options = {}) {
      return this.model.findOne({ where: { ...conditions }, options });
   }

   findAll(conditions = {}, options = {}) {
      return this.model.findAll({ where: { ...conditions }, options });
   }

   findAndCountAll(options = {}) {
      return this.model.findAndCountAll(options);
   }

   findOrCreate({ where = {}, defaults = {} }) {
      return this.model.findOrCreate({ where, defaults });
   }

   create(data = {}) {
      return this.model.create({ ...data });
   }

   update(data = {}, conditions = {}) {
      return this.model.update({ ...data }, { where: { ...conditions } });
   }

   updateByPk(data = {}, id) {
      //Gọi hàm model
      return this.model.update({ ...data }, { where: { id } });
   }

   delete(where = {}) {
      //Gọi hàm model
      return this.model.destroy({ where });
   }

   deleteByPk(id) {
      //Gọi hàm model
      return this.model.destroy({ where: { id } });
   }
};
