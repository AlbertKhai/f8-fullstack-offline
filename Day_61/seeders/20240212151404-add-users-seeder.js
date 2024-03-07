"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const data = [];

      data.push({
         name: "admin",
         email: "admin@gmail.com",
         password: bcrypt.hashSync("admin", 10),
         created_at: new Date(),
         updated_at: new Date(),
      });

      await queryInterface.bulkInsert("users", data);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users");
   },
};
