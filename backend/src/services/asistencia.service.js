const {
  obtenerAsistenciaAlumnoRepo
} = require(
  "../repositories/asistencia.repository"
);

const obtenerAsistenciasService =
async (filtros) => {

  if (!filtros.alumno_id) {

    throw new Error(
      "El alumno_id es obligatorio"
    );
  }
  const result =
    await obtenerAsistenciaAlumnoRepo(
      filtros.alumno_id
    );
  return result;
};
module.exports = {
  obtenerAsistenciasService
};