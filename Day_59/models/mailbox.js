"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Mailbox extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Mailbox.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
         });
      }
   }
   Mailbox.init(
      {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         token_mail: {
            type: DataTypes.STRING(100),
            unique: true,
         },
         mail_to: DataTypes.STRING(100),
         mail_subject: DataTypes.TEXT,
         mail_content: DataTypes.TEXT,
         viewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
         },
         user_id: {
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
         },
      },
      {
         sequelize,
         modelName: "Mailbox",
         tableName: "mailboxes",
         createdAt: "created_at",
         updatedAt: "updated_at",
      }
   );
   return Mailbox;
};
