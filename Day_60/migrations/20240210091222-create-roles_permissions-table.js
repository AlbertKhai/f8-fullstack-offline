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

      await queryInterface.createTable("roles_permissions", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: Sequelize.INTEGER,
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
         permission_id: {
            type: Sequelize.INTEGER,
            references: {
               model: {
                  tableName: "permissions",
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
      await queryInterface.dropTable("roles_permissions");
   },
};
