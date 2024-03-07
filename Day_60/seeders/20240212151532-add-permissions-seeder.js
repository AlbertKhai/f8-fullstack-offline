"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
       */

      const crud = ["read", "add", "edit", "delete"];
      const modules = ["Users", "Roles"];

      const data = modules.reduce((prev, module) => {
         return [
            ...prev,
            ...crud.map((crudItem) => ({
               name: crudItem + module,
               created_at: new Date(),
               updated_at: new Date(),
            })),
         ];
      }, []);

      await queryInterface.bulkInsert("permissions", data);
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await queryInterface.bulkDelete("permissions");
   },
};
