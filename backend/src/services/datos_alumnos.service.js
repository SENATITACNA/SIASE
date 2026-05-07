const datosAlumnosRepo = require('../repositories/datos_alumnos.repository');

class DatosAlumnosService {
    async obtenerAlumnoPorId(id) {
        return await datosAlumnosRepo.obtenerAlumnoPorId(id);
    }
}

module.exports = new DatosAlumnosService();