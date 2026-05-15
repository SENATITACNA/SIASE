const db = require('../config/db');

const registrarAsistencia = async (alumno_id, guardia_id) => {
    await db.query(
        "INSERT INTO asistencia (alumno_id, guardia_id, fecha, hora_ingreso) VALUES (?, ?, CURDATE(), CURTIME())",
        [alumno_id, guardia_id]
    );
};

const obtenerUltimoEscaneoRepo = async (guardia_id) => {
    const sql = `
        SELECT a.id as asistencia_id, a.hora_ingreso, d.nombres, d.apellidos, d.idsenati 
        FROM asistencia a
        JOIN datos_alumnos d ON a.alumno_id = d.id
        WHERE a.guardia_id = ?
        ORDER BY a.id DESC
        LIMIT 1
    `;
    const [rows] = await db.promise().query(sql, [guardia_id]);
    return rows;
};

const obtenerAsistenciasRepo = async (filtros) => {
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
  
    if (filtros.guardia) {
      sql += " AND v.nombre LIKE ?";
      params.push(`%${filtros.guardia}%`);
    }
  
    if (filtros.fecha) {
      sql += " AND a.fecha = ?";
      params.push(filtros.fecha);
    }
  
    if (filtros.alumno) {
      sql += " AND al.nombres LIKE ?";
      params.push(`%${filtros.alumno}%`);
    }
    
    const [result] = await db.promise().query(sql, params);
    return result;
};

const obtenerAsistenciaAlumnoRepo =
async (filtros) => {

    let sql = `
      SELECT 
        a.id,

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

    let params = [filtros.alumno_id];

    if (filtros.guardia) {

      sql += `
        AND CONCAT(v.nombre, ' ', v.apellido)
        LIKE ?
      `;

      params.push(`%${filtros.guardia}%`);

    }

    if (filtros.fecha) {

      sql += `
        AND a.fecha = ?
      `;

      params.push(filtros.fecha);

    }

    if (filtros.equipo) {

      sql += `
        AND dxa.tipo LIKE ?
      `;

      params.push(`%${filtros.equipo}%`);

    }

    sql += `
      ORDER BY a.fecha DESC,
      a.hora_ingreso DESC
    `;

    const [result] =
      await db.promise().query(sql, params);

    return result;

};

module.exports = {
    registrarAsistencia,
    obtenerUltimoEscaneoRepo,
    obtenerAsistenciasRepo,
    obtenerAsistenciaAlumnoRepo
};