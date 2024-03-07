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
         email: Sequelize.STRING(100),
         password: Sequelize.STRING(100),
         status: Sequelize.BOOLEAN,
         avatar_url: Sequelize.STRING,
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("users");
   },
};
