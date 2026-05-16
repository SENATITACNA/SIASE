
const {
  obtenerAsistenciaPorAlumnoRepo
} = require("../repositories/asistencia.repository");

const obtenerAsistenciasService = async (filtros) => {
  if (!filtros.alumno_id) {
    throw new Error("El alumno_id es obligatorio");
  }
  const result = await obtenerAsistenciaPorAlumnoRepo(
    filtros.alumno_id,
    filtros           
  );
  return result;
};

module.exports = { obtenerAsistenciasService };