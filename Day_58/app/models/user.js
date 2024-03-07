"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         User.hasMany(models.Device, {
            foreignKey: "user_id",
            as: "devices",
         });
      }
   }
   User.init(
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: DataTypes.STRING(50),
         email: {
            type: DataTypes.STRING(100),
            unique: true,
         },
         password: DataTypes.STRING(100),
      },
      {
         sequelize,
         modelName: "User",
         tableName: "users",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return User;
};
