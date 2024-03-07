"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { Provider } = require("../models/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const data = [];

      data.push({
         name: "admin",
         email: "admin@gmail.com",
         password: bcrypt.hashSync("admin", 10),
         status: true,
         created_at: faker.date.past(),
         updated_at: faker.date.past(),
      });

      for (let i = 0; i < 30; i++) {
         const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync(".", 10),
            status: true,
            created_at: faker.date.past(),
            updated_at: faker.date.past(),
         };
         data.push(user);
      }

      await queryInterface.bulkInsert("users", data);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users");
   },
};
