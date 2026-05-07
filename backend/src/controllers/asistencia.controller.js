const db = require("../config/db");

const getAsistencias = (req, res) => {

  const { alumno, fecha } = req.query;

  let sql = `
    SELECT 
      rd.id,
      dxa.tipo,
      dxa.marca,
      dxa.modelo,
      rd.fecha_entrada,
      rd.fecha_salida,
      rd.estado,
      CONCAT(v.nombre, ' ', v.apellido) AS vigilante,
    FROM registro_dispositivo rd

    JOIN dispositivos_x_alumno dxa
    ON rd.objeto_id = dxa.id

    JOIN vigilante v
    ON rd.vigilante_id = v.id

    JOIN datos_alumnos al 
    ON rd.alumno_id = al.id

    WHERE 1=1
  `;

  let params = [];

  if (alumno) {
    sql += ` AND CONCAT(al.nombres, ' ', al.apellidos) LIKE ? `;
    params.push(`%${alumno}%`);
  }

  if (fecha) {
    sql += ' AND rd.fecha_entrada = ?';
    params.push(fecha);
  }
  sql += `
    ORDER BY rd.fecha_creacion DESC
  `;

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ 
        error: "Error en servidor" 
      });
    }

    res.json(result);
  });
};

module.exports = {
  getAsistencias
};