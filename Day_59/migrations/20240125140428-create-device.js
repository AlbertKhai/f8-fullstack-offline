"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("devices", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         user_id: {
            type: Sequelize.INTEGER,
            references: {
               model: { tableName: "users" },
               key: "id",
            },
         },
         token: Sequelize.STRING(100),
         info: Sequelize.STRING(100),
         login: Sequelize.DATE,
         activity: Sequelize.DATE,
         created_at: {
            type: Sequelize.DATE,
         },
         updated_at: {
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("devices");
   },
};
