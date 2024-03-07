"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

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
      const data = [];

      data.push({
         name: "admin",
         email: "admin@gmail.com",
         password: bcrypt.hashSync("admin", 10),
         created_at: faker.date.past(),
         updated_at: faker.date.past(),
      });

      for (let i = 0; i < 15; i++) {
         const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync(".", 10),
            created_at: faker.date.past(),
            updated_at: faker.date.past(),
         };
         data.push(user);
      }

      await queryInterface.bulkInsert("users", data);
   },

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await queryInterface.bulkDelete("users");
   },
};
