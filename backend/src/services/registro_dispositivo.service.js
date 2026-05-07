const registroRepository = require('../repositories/registro_dispositivo.repository');

class RegistroDispositivoService {
    async obtenerRegistros() {
        return await registroRepository.obtenerRegistros();
    }
}

module.exports = new RegistroDispositivoService();