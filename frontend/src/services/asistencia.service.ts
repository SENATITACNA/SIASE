const API = "http://localhost:3000/api/asistencia";

export const obtenerAsistencias = async (filtros: any) => {
  const params = new URLSearchParams(filtros);

  const response = await fetch(
    `${API}?${params.toString()}`
  );

  return await response.json();

};