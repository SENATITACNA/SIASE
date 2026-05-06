const datosAlumnosRepository = require("../repositories/datos_alumnosRepository");

const obtenerAlumnoPorId = (id, callback) => {
    datosAlumnosRepository.obtenerAlumnoPorId(id, (err, alumno) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, alumno);
        }
    });
};

module.exports = {
    obtenerAlumnoPorId
};