const pool = require("../config/db");

class VigilanteRepository {
    async obtenerAlumnosActivos() {
        const query = `
            SELECT 
                a.id, a.nombres, a.apellidos, a.idsenati, a.semestre, 
                c.nombre AS carrera 
            FROM datos_alumnos a
            LEFT JOIN carreras c ON a.carrera_id = c.id
            WHERE a.estado = 1
        `;
        const [rows] = await pool.promise().query(query);
        return rows;
    }

    async obtenerRegistroPorId(connection, registroId) {
        const [rows] = await connection
            .promise()
            .query("SELECT alumno_id FROM registro_dispositivo WHERE id = ?", [
                registroId,
            ]);
        return rows[0];
    }

    async actualizarEstadoRegistro(connection, registroId, nuevoEstado) {
        await connection
            .promise()
            .query("UPDATE registro_dispositivo SET estado = ? WHERE id = ?", [
                nuevoEstado,
                registroId,
            ]);
    }

    async registrarEntradaAsistencia(connection, alumnoId, vigilanteId) {
        await connection
            .promise()
            .query(
                "INSERT INTO asistencia (alumno_id, guardia_id, fecha, hora_ingreso) VALUES (?, ?, CURDATE(), CURTIME())",
                [alumnoId, vigilanteId],
            );
    }

    async registrarSalidaAsistencia(connection, alumnoId) {
        await connection.promise().query(
            `
            UPDATE asistencia 
            SET hora_salida = CURTIME() 
            WHERE alumno_id = ? 
              AND fecha = CURDATE() 
              AND hora_salida IS NULL 
            ORDER BY id DESC LIMIT 1
        `,
            [alumnoId],
        );
    }

    async getVigilantePorId(vigilanteId) {
        const query = `
            SELECT id AS vigilante_id, nombre, apellido, turno
            FROM vigilante
            WHERE guardia_id = ?
        `;
        const [rows] = await pool.promise().query(query, [vigilanteId]);
        return rows;
    }

    async obtenerVigilantePorCredenciales(usuario, password) {
        const query = "SELECT id, guardia_id, password_vigilante, estado FROM vigilante WHERE guardia_id = ? AND password_vigilante = ? AND estado = 1";
        const [rows] = await pool.promise().query(query, [usuario, password]);
        return rows;
    }
}

module.exports = new VigilanteRepository();
