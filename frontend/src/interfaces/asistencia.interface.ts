export interface Asistencia {
  id: number;
  fecha: string;           // "2024-05-08"
  hora_ingreso: string;     // "08:00"
  hora_salida: string;      // "17:00"
  vigilante: string;
  equipo?: string;
  marca?: string;
  modelo?: string;
}
export interface FiltrosAsistencia {
  vigilante: string;
  fecha: string;
  equipo: string;
}

export interface EstudianteSession {
  id: number;
  nombre: string;
  codigo: string;
}