const db = require("../config/db");

const obtenerAsistenciasTablaRepo = async (filtros = {}) => {
  let sql = `
    SELECT 
      at.id,
      da.idsenati,
      CONCAT(da.nombres, ' ', da.apellidos) AS NombreCompleto,
      c.nombre AS Carrera,
      da.semestre AS Semestre,
      at.fecha AS Fecha,
      at.hora_ingreso AS HoraIngreso
    FROM asistencia at
    INNER JOIN datos_alumnos da ON at.alumno_id = da.id
    INNER JOIN carreras c ON da.carrera_id = c.id
    WHERE 1=1
  `;

  const params = [];

  if (filtros.guardia) {
    sql += " AND at.guardia_id = ?";
    params.push(filtros.guardia);
  }

  if (filtros.fecha) {
    sql += " AND at.fecha = ?";
    params.push(filtros.fecha);
  }

  if (filtros.idsenati) {
    sql += " AND da.idsenati = ?";
    params.push(filtros.idsenati);
  }

  sql += " ORDER BY at.fecha DESC, at.hora_ingreso DESC";

  const [rows] = await db.promise().query(sql, params);
  return rows;
};

const obtenerAsistenciaTablaById = async (id) => {
  const sql = `
    SELECT * 
    FROM asistencia
    WHERE id = ?
  `;

  const [rows] = await db.promise().query(sql, [id]);
  return rows[0];
};

module.exports = {
  obtenerAsistenciasTablaRepo,
  obtenerAsistenciaTablaById
};