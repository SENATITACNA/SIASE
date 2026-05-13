const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado en el servidor");
    connection.release();
  } catch (err) {
    console.error("Error de conexión a la base de datos", err.message);
  }
})();

module.exports = pool;