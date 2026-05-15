import type { Alumno } from "../types/alumnos";
import { API_BASE } from "./api";

const API_URL = `${API_BASE}/api/alumnos`;

export const obtenerAlumno = async (
  id: number
): Promise<Alumno> => {
 const response = await fetch(`${API_URL}/${id}`, {
  method: "GET", 
  credentials: "include"
});

if (!response.ok) {
  throw new Error("Error al obtener alumno");
}

  return await response.json();
};