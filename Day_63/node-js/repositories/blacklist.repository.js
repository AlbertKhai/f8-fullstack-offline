//Tương ứng với model User
const { Blacklist } = require("../models/index");
const Repository = require("../core/repository");
module.exports = new (class extends Repository {
   getModel() {
      return Blacklist;
   }

   async save(token, expired) {
      let [blacklist, created] = await this.findOrCreate({
         where: { token },
         defaults: { token, expired },
      });

      return blacklist;
   }
})();
