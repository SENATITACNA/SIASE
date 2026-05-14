const db = require("../config/db");
exports.getById = async (id) => {
  const query = `
    SELECT 
      da.idsenati AS id,
      CONCAT(da.nombres, ' ', da.apellidos) AS nombre,
      c.nombre AS carrera,
      da.semestre,
      a.fecha,
      a.hora_ingreso
    FROM datos_alumnos da
    LEFT JOIN asistencia a ON da.idsenati = a.alumno_id
    LEFT JOIN carreras c ON da.carrera_id = c.id
    WHERE da.idsenati = ?
  `;
  const [rows] = await db.query(query, [id]);
  return rows[0];
}; borrar