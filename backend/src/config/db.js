const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyecto_SIASE"
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err.message);
    process.exit(1);
  }
  console.log("Conexión exitosa a MySQL - Base de datos: proyecto_SIASE");
});

module.exports = connection;
