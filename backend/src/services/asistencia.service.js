const asistenciaRepository = require("../repositories/asistencia.repository");

const obtenerAsistencias = async (filtros) => {
  return await asistenciaRepository.obtenerAsistenciasRepo(filtros);
};

const obtenerAsistenciaPorAlumno = async (alumnoId) => {
  return await asistenciaRepository.obtenerAsistenciaPorAlumnoRepo(alumnoId);
};

module.exports = {
  obtenerAsistencias,
  obtenerAsistenciaPorAlumno,
};
