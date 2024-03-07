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

      await queryInterface.addConstraint("users", {
         name: "users_provider_id_foreign",
         type: "foreign key",
         fields: ["provider_id"],
         references: {
            table: "providers",
            field: "id",
         },
      });
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */

      await queryInterface.removeConstraint(
         "users",
         "users_provider_id_foreign"
      );
   },
};
