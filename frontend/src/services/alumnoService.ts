import type { Alumno } from "../types/alumnos";

const API_URL = "http://localhost:3000/api/alumnos";

export const obtenerAlumno = async (
  id: number
): Promise<Alumno> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener alumno");
  }

  return await response.json();
};