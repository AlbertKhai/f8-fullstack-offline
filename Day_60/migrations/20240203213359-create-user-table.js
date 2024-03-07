"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("users", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: Sequelize.STRING(50),
         email: {
            type: Sequelize.STRING(100),
            unique: true,
         },
         password: Sequelize.STRING(100),
         provider_id: Sequelize.INTEGER,
         created_at: {
            type: Sequelize.DATE,
         },
         updated_at: {
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("users");
   },
};
