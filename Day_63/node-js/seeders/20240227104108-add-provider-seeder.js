"use strict";
const { User } = require("../models/index");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const users = (await User.findAll()).map(({ id }) => id);

      const data = users.reduce((prev, user_id) => {
         const userProviders = faker.helpers
            .arrayElements(["github", "google", "email"], {
               min: 1,
               max: 3,
            })
            .map((name) => ({
               name,
               user_id,
               created_at: faker.date.past(),
               updated_at: faker.date.past(),
            }));

         return [...prev, ...userProviders];
      }, []);

      await queryInterface.bulkInsert("providers", data);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("providers");
   },
};
