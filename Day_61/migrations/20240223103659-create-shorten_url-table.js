"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("shorten_urls", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         user_id: {
            type: Sequelize.INTEGER,
            references: {
               model: {
                  tableName: "users",
               },
               key: "id",
            },
            onDelete: "CASCADE",
         },
         original_url: Sequelize.TEXT,
         shorten_url: {
            type: Sequelize.STRING(10),
            unique: true,
         },
         safe_navigation: Sequelize.BOOLEAN,
         password: Sequelize.STRING(20),
         visit: Sequelize.INTEGER,
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("shorten_urls");
   },
};
