const db = require("../config/db");

const obtenerAlumnoPorId = (id, callback) => {
  const sql = "SELECT * FROM datos_alumnos WHERE id = ?";
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      callback(err, null);
    } else {
      // Retornamos solo un objeto en lugar de un array
      callback(null, resultados[0]);
    }
  });
};

module.exports = {
  obtenerAlumnoPorId
};