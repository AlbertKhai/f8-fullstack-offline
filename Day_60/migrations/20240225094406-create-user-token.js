"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("user_tokens", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         refresh_token: {
            type: Sequelize.STRING,
            unique: true,
         },
         user_id: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
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
      await queryInterface.dropTable("user_tokens");
   },
};
