import { API_BASE } from './api';

export interface AsistenciaRegistro {
  id: number;
  fecha: string;
  hora_ingreso: string;
  hora_salida: string | null;
  dispositivo: string | null;
}

export const obtenerAsistenciaPorAlumno = async (alumnoId: number): Promise<AsistenciaRegistro[]> => {
  const response = await fetch(`${API_BASE}/api/asistencia/alumno/${alumnoId}`);
  if (!response.ok) {
    throw new Error('Error al obtener asistencias');
  }
  return response.json();
};
