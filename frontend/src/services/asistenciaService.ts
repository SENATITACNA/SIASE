import { API_BASE } from "./api";
import type {
  Asistencia,
  FiltrosAsistencia
} from "../types/asistencia";

const API_URL =
  `${API_BASE}/api/asistencia`;

export const obtenerAsistencias =
async (
  filtros: FiltrosAsistencia
): Promise<Asistencia[]> => {

  const params =
    new URLSearchParams();

  params.append(
    "alumno_id",
    filtros.alumno_id.toString()
  );

  if (filtros.fecha) {
    params.append(
      "fecha",
      filtros.fecha
    );
  }

  if (filtros.equipo) {
    params.append(
      "equipo",
      filtros.equipo
    );
  }

  if (filtros.guardia) {
    params.append(
      "guardia",
      filtros.guardia
    );
  }

  const response = await fetch(
  `${API_URL}?${params.toString()}`,
  {
    credentials: "include"   // ← necesario para enviar la cookie del token
  }
);

  if (!response.ok) {
    throw new Error(
      "Error al obtener asistencias"
    );
  }

  return await response.json();
};