"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class UserToken extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   UserToken.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         refresh_token: {
            type: DataTypes.STRING,
            unique: true,
         },
         user_id: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "UserToken",
         tableName: "user_tokens",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return UserToken;
};
