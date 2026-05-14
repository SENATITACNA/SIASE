const API = "http://localhost:3000/api/asistencia";

type FiltrosAsistencia = {
  alumno_id?: string;
  fecha?: string;
  equipo?: string;
  vigilante?: string;
};

export const obtenerAsistencias = async (
  filtros: FiltrosAsistencia
) => {
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

  if (!response.ok) {
    throw new Error("Error al obtener asistencias");
  }

  return await response.json();
};

export const formatearFecha = (
  fecha: string
): string => {
  const date = new Date(fecha + "T00:00:00");

  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};