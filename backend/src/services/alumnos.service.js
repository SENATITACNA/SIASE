const alumnosRepository = require("../repositories/alumnos.repository");

exports.obtenerAlumnoFormateadoPorId = async (id) => {
  return await alumnosRepository.obtenerAlumnoFormateadoPorId(id);
};

exports.obtenerDatosAlumnoPorId = async (id) => {
  return await alumnosRepository.obtenerDatosAlumnoPorId(id);
};
