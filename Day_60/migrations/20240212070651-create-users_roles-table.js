"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
      await queryInterface.createTable("users_roles", {
         id: {
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
         role_id: {
            type: Sequelize.INTEGER,
            references: {
               model: {
                  tableName: "roles",
               },
               key: "id",
            },
            onDelete: "CASCADE",
         },
         created_at: Sequelize.DATE,
         updated_at: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
      await queryInterface.dropTable("users_roles");
   },
};
