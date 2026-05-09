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

const pool = require('../config/db');

exports.obtenerAlumnoPorId = (id, callback) => {
  const sql = "SELECT id, nombres, apellidos, idsenati, semestre, carrera_id, estado FROM datos_alumnos WHERE id = ?";
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, resultados[0]);
    }
  });
};

exports.obtenerAlumnoPorCredenciales = async (usuario, password) => {
  const query = "SELECT id, nombres, apellidos, idsenati, carrera_id, semestre, estado FROM datos_alumnos WHERE idsenati = ? AND password_alumno = ? AND estado = 1";
  const [rows] = await db.promise().query(query, [usuario, password]);
  return rows;
};