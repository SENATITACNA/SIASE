<<<<<<< HEAD
export interface RegistroAsistencia {
  id: string;
  fecha: string;
  horaIngreso: string;
  dispositivo: string;
  vigilante: string;
}

export interface FiltrosAsistencia {
  fecha: string;
  dispositivo: string;
  vigilante: string;
=======
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
>>>>>>> 0b5b63a4e77bfd0cc06e55ab2867f3a62ccd5ecb
}