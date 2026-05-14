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

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err.message);
  } else {
    console.log("Conectado a el servidor");
    if (connection) connection.release();
  }
});

module.exports = pool;