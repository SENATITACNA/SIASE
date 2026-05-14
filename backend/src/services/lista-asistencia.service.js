const pool = require("../db/db");
const obtenerListaAsistencia = (idsenati) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
          da.idsenati,
          CONCAT(da.nombres, ' ', da.apellidos) AS nombre_completo,
          c.nombre AS carrera,
          da.semestre,
          a.fecha,
          a.hora_ingreso
      FROM asistencia a
      INNER JOIN datos_alumnos da ON a.alumno_id = da.id
      INNER JOIN carreras c ON da.carrera_id = c.id
      WHERE da.idsenati = ?
      ORDER BY a.fecha DESC, a.hora_ingreso DESC;
    `;
    pool.query(sql, [idsenati], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
module.exports = {
  obtenerListaAsistencia
};