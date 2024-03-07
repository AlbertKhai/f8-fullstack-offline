// config/config.js
require("dotenv").config();
const pg = require("pg");

const config = ["development", "test", "production"].reduce((prev, curr) => {
   prev[curr] = {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      dialect: process.env.DB_DIALECT || "postgres",
      port: process.env.DB_PORT || 5432,
      dialectModule: pg,
   };

   if (process.env.NODE_ENV === "production") {
      prev[curr].dialectOptions = { ssl: { require: true } };
   }

   return prev;
}, {});

module.exports = config;
