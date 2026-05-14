import type { Alumno } from "../types/alumnos";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/alumnos`;

export const obtenerAlumno = async (
  id: number
): Promise<Alumno> => {

  const response =
    await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(
      "Error al obtener alumno"
    );
  }

  return await response.json();
};