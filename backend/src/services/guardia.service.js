const pool = require('../config/db');
const guardiaRepo = require('../repositories/guardia.repository');

class GuardiaService {
    async listarAlumnos() {
        return await guardiaRepo.obtenerAlumnosActivos();
    }

    async procesarCambioEstado(registroId, nuevoEstado, guardiaId) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const registro = await guardiaRepo.obtenerRegistroPorId(connection, registroId);
            if (!registro) {
                throw new Error('Registro de dispositivo no encontrado');
            }

            await guardiaRepo.actualizarEstadoRegistro(connection, registroId, nuevoEstado);

            if (nuevoEstado === 2) {
                await guardiaRepo.registrarEntradaAsistencia(connection, registro.alumno_id, guardiaId);
            } else if (nuevoEstado === 3) {
                await guardiaRepo.registrarSalidaAsistencia(connection, registro.alumno_id);
            }

            await connection.commit();
            return { exito: true, mensaje: 'Estado y asistencia actualizados correctamente' };

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = new GuardiaService();