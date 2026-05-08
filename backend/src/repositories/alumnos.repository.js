const db = require("../config/db");

exports.obtenerAlumnoFormateadoPorId = async (id) => {
  const query = `
        SELECT
            da.id,
            CONCAT(da.nombres, ' ', da.apellidos) AS nombre_completo,
            c.nombre AS carrera,
            da.semestre
        FROM datos_alumnos da
        INNER JOIN carreras c
            ON da.carrera_id = c.id
        WHERE da.id = ?
    `;

  const [rows] = await db.promise().query(query, [id]);

  return rows[0];
};

exports.obtenerDatosAlumnoPorId = async (id) => {
  const sql = `
    SELECT 
      id,
      nombres,
      apellidos,
      idsenati,
      semestre,
      carrera_id,
      estado
    FROM datos_alumnos
    WHERE id = ?
  `;

  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

const pool = require('../config/db');

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
  obtenerAlumnoPorId
};