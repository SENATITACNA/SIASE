const pool = require('../config/db');

class GuardiaRepository {
    async obtenerAlumnosActivos() {
        const query = `
            SELECT 
                a.id, a.nombres, a.apellidos, a.idsenati, a.semestre, 
                c.nombre AS carrera 
            FROM datos_alumnos a
            LEFT JOIN carreras c ON a.carrera_id = c.id
            WHERE a.estado = 1
        `;
        const [rows] = await pool.query(query);
        return rows;
    }

    async obtenerRegistroPorId(connection, registroId) {
        const [rows] = await connection.query(
            'SELECT alumno_id FROM registro_dispositivo WHERE id = ?',
            [registroId]
        );
        return rows[0];
    }

    async actualizarEstadoRegistro(connection, registroId, nuevoEstado) {
        await connection.query(
            'UPDATE registro_dispositivo SET estado = ? WHERE id = ?',
            [nuevoEstado, registroId]
        );
    }

    async registrarEntradaAsistencia(connection, alumnoId, guardiaId) {
        await connection.query(
            'INSERT INTO asistencia (alumno_id, guardia_id) VALUES (?, ?)',
            [alumnoId, guardiaId]
        );
    }

    async registrarSalidaAsistencia(connection, alumnoId) {
        await connection.query(`
            UPDATE asistencia 
            SET hora_salida = CURTIME() 
            WHERE alumno_id = ? 
              AND fecha = CURDATE() 
              AND hora_salida IS NULL 
            ORDER BY id DESC LIMIT 1
        `, [alumnoId]);
    }
}

module.exports = new GuardiaRepository();