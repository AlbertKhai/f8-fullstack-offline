"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("password_reset_tokens", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         token: Sequelize.STRING(36),
         user_id: {
            type: Sequelize.INTEGER,
            references: {
               model: {
                  tableName: "users",
               },
               key: "id",
            },
         },
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("password_reset_tokens");
   },
};
