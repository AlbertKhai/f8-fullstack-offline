"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("mailboxes", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         token_mail: {
            type: Sequelize.STRING(100),
            unique: true,
         },
         mail_to: Sequelize.STRING(100),
         mail_subject: Sequelize.TEXT,
         mail_content: Sequelize.TEXT,
         viewed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
         },
         user_id: {
            type: Sequelize.INTEGER,
            references: {
               model: { tableName: "users" },
               key: "id",
            },
            onDelete: "CASCADE",
         },
         created_at: {
            type: Sequelize.DATE,
         },
         updated_at: {
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("mailboxes");
   },
};
