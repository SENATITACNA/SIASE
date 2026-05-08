const db = require("../config/db");

const obtenerAlumnoPorId = (id, callback) => {
  const sql = "SELECT id, nombres, apellidos, idsenati, semestre, carrera_id, estado, FROM datos_alumnos WHERE id = ?";
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, resultados[0]);
    }
  });
};

module.exports = {
  obtenerAlumnoPorId,
};
