const db = require("../config/db");

const getAsistencias = async (req, res) => {
  const { guardia, fecha, alumno } = req.query;

  let sql = `
    SELECT 
      a.id,
      a.fecha,
      a.hora_ingreso,
      a.hora_salida,
      CONCAT(al.nombres, ' ', al.apellidos) AS alumno,
      CONCAT(v.nombre, ' ', v.apellido) AS guardia,
      c.nombre AS carrera
    FROM asistencia a
    JOIN datos_alumnos al ON a.alumno_id = al.id
    JOIN vigilante v ON a.guardia_id = v.id
    JOIN carreras c ON al.carrera_id = c.id
    WHERE 1=1
  `;

  let params = [];

  if (guardia) {
    sql += " AND v.nombre LIKE ?";
    params.push(`%${guardia}%`);
  }

  if (fecha) {
    sql += " AND a.fecha = ?";
    params.push(fecha);
  }

  if (alumno) {
    sql += " AND al.nombres LIKE ?";
    params.push(`%${alumno}%`);
  }

  try {
    const [result] = await db.promise().query(sql, params);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error en servidor" });
  }
};

module.exports = {
  getAsistencias,
};
