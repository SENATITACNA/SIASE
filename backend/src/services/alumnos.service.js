const alumnosRepository = require("../repositories/alumnos.repository");

exports.obtenerAlumnoPorId = async (id) => {
  return await alumnosRepository.obtenerAlumnoPorId(id);
};
