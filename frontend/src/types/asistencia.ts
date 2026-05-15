export interface Asistencia {
  id: number;
  fecha: string;
  hora_ingreso: string;
  vigilante: string;
  equipo: string | null;
  marca: string | null;
  modelo: string | null;
}

export interface FiltrosAsistencia {
  alumno_id: number;
  fecha?: string;
  equipo?: string;
  guardia?: string;
}