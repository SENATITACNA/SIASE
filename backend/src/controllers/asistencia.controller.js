const db = require("../config/db");

const getAsistencias = async (req, res) => {

  const { alumno_id, guardia, fecha, equipo } = req.query;

  let sql = `
    SELECT 
      rd.id,

      a.fecha,
      a.hora_ingreso,
      a.hora_salida,

      CONCAT(v.nombre, ' ', v.apellido)
      AS vigilante,

      dxa.tipo AS equipo,
      dxa.marca,
      dxa.modelo

    FROM asistencia a
    JOIN vigilante v
    ON a.guardia_id = v.id

    JOIN datos_alumnos al
    ON a.alumno_id = al.id

    LEFT JOIN registro_dispositivo rd
    ON rd.alumno_id = al.id

    LEFT JOIN dispositivos_x_alumno dxa
    ON rd.objeto_id = dxa.id

    WHERE a.alumno_id = ?
  `;

  let params = [alumno_id];

  if (guardia) {

    sql += `
      AND CONCAT(v.nombre, ' ', v.apellido)
      LIKE ?
    `;
    params.push(`%${guardia}%`);
  }
  if (fecha) {
    sql += ' AND a.fecha = ?';
    params.push(fecha);
  }

  if (equipo) {

    sql += ` AND dxa.tipo LIKE ?
    `;
    params.push(`%${equipo}%`);
  }

  sql += `
    ORDER BY a.fecha DESC,
    a.hora_ingreso DESC
  `;

  try {
  const [result] =
    await db.promise().query(sql, params);
  res.json(result);
} catch (err) {
  console.log(err);
  return res.status(500).json({
    error: "Error en servidor"
  });
}
};

module.exports = {
  getAsistencias
};
