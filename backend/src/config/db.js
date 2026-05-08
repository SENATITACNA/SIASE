const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Conectado a MySQL (Pool)");

module.exports = pool.promise();
