"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Device extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Device.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
         });
      }
   }
   Device.init(
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         user_id: DataTypes.INTEGER,
         token: DataTypes.STRING(100),
         info: DataTypes.STRING(100),
         login: DataTypes.DATE,
         activity: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: "Device",
         tableName: "devices",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return Device;
};
