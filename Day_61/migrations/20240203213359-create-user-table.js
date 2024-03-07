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
         picture: Sequelize.TEXT,
         provider_id: {
            type: Sequelize.INTEGER,
            references: {
               model: {
                  tableName: "providers",
               },
               key: "id",
            },
         },
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("users");
   },
};
