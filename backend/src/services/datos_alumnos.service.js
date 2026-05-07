const alumnosRepository = require("../repositories/datos_alumnos.repository");

const obtenerAlumnoPorId = (id, callback) => {
  alumnosRepository.obtenerAlumnoPorId(id, (err, alumno) => {
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