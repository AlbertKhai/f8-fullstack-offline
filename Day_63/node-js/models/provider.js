"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Provider extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Provider.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "users",
         });
      }
   }
   Provider.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         name: DataTypes.STRING(10),
         user_id: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "Provider",
         tableName: "providers",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return Provider;
};
