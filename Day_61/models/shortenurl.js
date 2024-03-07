"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class ShortenUrl extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         ShortenUrl.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
         });
      }
   }
   ShortenUrl.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         original_url: DataTypes.TEXT,
         shorten_url: {
            type: DataTypes.STRING(100),
            unique: true,
         },
         safe_navigation: DataTypes.BOOLEAN,
         password: DataTypes.STRING(20),
         visit: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "ShortenUrl",
         tableName: "shorten_urls",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return ShortenUrl;
};
