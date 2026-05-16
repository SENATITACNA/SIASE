const db = require('../config/db');

const registrarAsistencia = async (alumno_id, guardia_id, conn = null) => {
    const q = conn || db.promise();
    await q.query(
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

// En asistencia.repository.js — reemplaza solo esta función ✅
const obtenerAsistenciaPorAlumnoRepo = async (alumnoId, filtros = {}) => {
    let sql = `
        SELECT
            a.id,
            a.fecha,
            a.hora_ingreso,
            CONCAT(v.nombre, ' ', v.apellido) AS vigilante,
            (
                SELECT d.tipo
                FROM registro_dispositivo r
                JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
                WHERE r.alumno_id = a.alumno_id
                  AND DATE(r.fecha_entrada) = DATE(a.fecha)
                ORDER BY r.id DESC LIMIT 1
            ) AS equipo,
            (
                SELECT d.marca
                FROM registro_dispositivo r
                JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
                WHERE r.alumno_id = a.alumno_id
                  AND DATE(r.fecha_entrada) = DATE(a.fecha)
                ORDER BY r.id DESC LIMIT 1
            ) AS marca,
            (
                SELECT d.modelo
                FROM registro_dispositivo r
                JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
                WHERE r.alumno_id = a.alumno_id
                  AND DATE(r.fecha_entrada) = DATE(a.fecha)
                ORDER BY r.id DESC LIMIT 1
            ) AS modelo
        FROM asistencia a
        JOIN vigilante v ON a.guardia_id = v.id
        WHERE a.alumno_id = ?
    `;

    const params = [alumnoId];

    if (filtros.fecha) {
        sql += " AND a.fecha = ?";
        params.push(filtros.fecha);
    }

    if (filtros.guardia) {
        sql += " AND CONCAT(v.nombre, ' ', v.apellido) LIKE ?";
        params.push(`%${filtros.guardia}%`);
    }

    if (filtros.equipo) {
        sql += `
            AND EXISTS (
                SELECT 1
                FROM registro_dispositivo r
                JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
                WHERE r.alumno_id = a.alumno_id
                  AND DATE(r.fecha_entrada) = DATE(a.fecha)
                  AND (d.tipo LIKE ? OR d.marca LIKE ? OR d.modelo LIKE ?)
            )
        `;
        params.push(
            `%${filtros.equipo}%`,
            `%${filtros.equipo}%`,
            `%${filtros.equipo}%`
        );
    }

    sql += " ORDER BY a.fecha DESC, a.hora_ingreso DESC";

    const [rows] = await db.promise().query(sql, params);
    return rows;
};

module.exports = {
    registrarAsistencia,
    obtenerUltimoEscaneoRepo,
    obtenerAsistenciasRepo,
    obtenerAsistenciaPorAlumnoRepo
};