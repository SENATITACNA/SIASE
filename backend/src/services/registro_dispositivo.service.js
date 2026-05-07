const registroRepository = require("../repositories/registro_dispositivo.repository");

class RegistroDispositivoService {

    /* GET - Obtener registros */
    async obtenerRegistros() {
        return await registroRepository.obtenerRegistros();
    }

    /* POST - Registrar dispositivo */
    async registrarDispositivo(data) {

        const dispositivoId =
            await registroRepository.crearDispositivo(data);

        const registroId =
            await registroRepository.crearRegistro({
                alumno_id: data.alumno_id,
                instructor_id: data.instructor_id,
                objeto_id: dispositivoId
            });

        return {
            dispositivo_id: dispositivoId,
            registro_id: registroId
        };
    }
}

module.exports = new RegistroDispositivoService();