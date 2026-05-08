const alumnosRepository = require("../repositories/datos_alumnos.repository");

const obtenerAlumnoPorId = async (id) => {
  return await alumnosRepository.obtenerAlumnoPorId(id);
};

module.exports = {
  obtenerAlumnoPorId,
};
