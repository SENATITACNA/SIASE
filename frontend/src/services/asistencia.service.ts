const API = "http://localhost:3000/api/asistencia";

export const obtenerAsistencias = async (filtros: any) => {

  const params = new URLSearchParams();

  if (filtros.alumno_id) {
    params.append("alumno_id", filtros.alumno_id);
  }

  if (filtros.fecha) {
    params.append("fecha", filtros.fecha);
  }

  if (filtros.equipo) {
    params.append("equipo", filtros.equipo);
  }

  if (filtros.vigilante) {
    params.append("guardia", filtros.vigilante);
  }

  const response = await fetch(
    `${API}?${params.toString()}`
  );

  return await response.json();
};