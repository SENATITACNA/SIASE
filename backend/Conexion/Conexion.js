const mysql = require('mysql2/promise');
// Configuración de la base de datos
const pool = mysql.createPool({
  host: '80.241.217.53',
  user: 'desarrollador',
  password: 'SENATI',
  database: 'proyecto_SIASE',
});
module.exports = pool;
