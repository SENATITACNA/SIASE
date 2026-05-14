const mysql = require("mysql2");
<<<<<<< HEAD

const db = mysql.createConnection({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE"
});

db.connect(err => {
  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("Base de datos conectada");
  }
});

module.exports = db;
=======
const pool = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
    connection.release();
  }
});

module.exports = pool;
>>>>>>> a7265d73ab0e803fe6fbf0c2757f999b9a19b49b
