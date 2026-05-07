const db = require("../config/db");

const getAsistencias = (req, res) => {

  const { alumno_id, guardia, fecha, equipo} = req.query;

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

    WHERE rd.alumno_id = ?
  `;

  let params = [alumno_id];

  if (guardia) {
    sql += ` AND CONCAT(al.nombres, ' ', al.apellidos) LIKE ? `;
    params.push(`%${alumno}%`);
  }

  if (fecha) {
    sql += ' AND rd.fecha_entrada = ?';
    params.push(fecha);
  }

  if (equipo) {
    sql += ' AND dxa.tipo LIKE ?';
    params.push('%${equipo}%');
  }
  sql += `
    ORDER BY rd.fecha_entrada DESC
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