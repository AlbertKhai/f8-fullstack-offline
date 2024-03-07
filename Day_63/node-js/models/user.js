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
         User.hasMany(models.Provider, {
            foreignKey: "user_id",
            as: "providers",
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
         email: DataTypes.STRING(100),
         password: DataTypes.STRING(100),
         status: DataTypes.BOOLEAN,
         avatar_url: DataTypes.STRING,
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
