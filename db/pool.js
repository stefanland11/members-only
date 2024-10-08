const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "stefanland",
  database: "members",
  password: "pass",
  port: 5432 // The default port
});