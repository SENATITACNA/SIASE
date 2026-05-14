const asistenciaRepository = require("../repositories/asistencia.repository");

const obtenerAsistencias = async (filtros) => {
  return await asistenciaRepository.obtenerAsistenciasRepo(filtros);
};

const obtenerAsistenciasPorAlumno = async (alumnoId) => {
  return await asistenciaRepository.obtenerAsistenciaPorAlumnoRepo(alumnoId);
};

module.exports = {
  obtenerAsistencias,
  obtenerAsistenciasPorAlumno,
};
