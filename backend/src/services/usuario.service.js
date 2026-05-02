const usuarioRepository = require('../repositories/usuario.repository');

const obtenerInstructor = (callback) => {
    usuarioRepository.getInstructores((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

const obtenerDispositivoAlumno = (callback) => {
    usuarioRepository.getDispositivosAlumno((err, data) => {
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