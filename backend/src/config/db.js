const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE"
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = connection;