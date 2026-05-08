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
    const [rows] = await db.query(sql, [guardia_id]);
    return rows;
};

module.exports = {
    registrarAsistencia,
    obtenerUltimoEscaneoRepo
};