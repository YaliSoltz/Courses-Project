const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "CoursesProject",
  password: "0543997375",
  port: 5432,
});

client.connect();





module.exports = client;
