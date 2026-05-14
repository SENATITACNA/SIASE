export interface Asistencia {
  id: number;
  fecha: string;
  hora_ingreso: string;
  vigilante: string;
  equipo?: string;
  marca?: string;
  modelo?: string;
}

export interface FiltrosAsistencia {
  fecha: string;
  equipo: string;
  vigilante: string;
}