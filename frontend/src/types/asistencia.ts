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
}