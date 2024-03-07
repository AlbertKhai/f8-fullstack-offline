"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class PasswordResetToken extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         PasswordResetToken.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "users",
         });
      }
   }
   PasswordResetToken.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         token: DataTypes.STRING(32),
         user_id: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "PasswordResetToken",
         tableName: "password_reset_tokens",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return PasswordResetToken;
};
