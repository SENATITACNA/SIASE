const vigilanteRepository = require('../repositories/vigilante.repository');

const obtenerInstructor = (callback) => {
    vigilanteRepository.getInstructores((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

const obtenerDispositivoAlumno = (callback) => {
    vigilanteRepository.getDispositivosAlumno((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

module.exports = {
  obtenerInstructor,
  obtenerDispositivoAlumno
};