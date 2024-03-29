"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("blacklist", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         token: {
            type: Sequelize.STRING,
            unique: true,
         },
         expired: Sequelize.INTEGER,
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("blacklist");
   },
};
