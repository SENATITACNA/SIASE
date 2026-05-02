const db = require("../config/db");

const obtenerRegistros = (callback) => {
  const sql = `
    SELECT 
      r.id,
      r.estado,
      r.fecha_envio,
      r.fecha_entrada,
      r.fecha_salida,
      r.observacion,
      CONCAT(a.nombres, ' ', a.apellidos) AS alumno,
      CONCAT(i.nombre, ' ', i.apellido)   AS instructor,
      CONCAT(g.nombre, ' ', g.apellido)   AS guardia,
      CONCAT(d.tipo, ' ', d.marca, ' ', d.modelo) AS objeto
    FROM registro_dispositivo r
    JOIN datos_alumnos       a ON r.alumno_id     = a.id
    JOIN instructor          i ON r.instructor_id = i.id
    JOIN vigilante           g ON r.guardia_id    = g.id
    JOIN dispositivos_x_alumno d ON r.objeto_id   = d.id
  `;

  db.query(sql, (err, resultados) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, resultados);
    }
  });
};

module.exports = {
  obtenerRegistros
};