import { RegistroAsistencia } from '../types/asistencia';

export const registrosMock: RegistroAsistencia[] = [
  { id: '1', fecha: '2026-05-13', horaIngreso: '07:55', dispositivo: 'Laptop MacBook Pro M2', vigilante: 'Carlos Ramos' },
  { id: '2', fecha: '2026-05-12', horaIngreso: '08:02', dispositivo: 'Laptop Lenovo ThinkPad', vigilante: 'Luis Medina' },
  { id: '3', fecha: '2026-05-11', horaIngreso: null, dispositivo: null, vigilante: null },
  { id: '4', fecha: '2026-05-10', horaIngreso: '07:45', dispositivo: 'iPad Pro', vigilante: 'Ana Torres' },
  { id: '5', fecha: '2026-05-09', horaIngreso: '08:30', dispositivo: 'Laptop Dell XPS', vigilante: 'Carlos Ramos' },
  { id: '6', fecha: '2026-05-08', horaIngreso: null, dispositivo: null, vigilante: null },
  { id: '7', fecha: '2026-05-07', horaIngreso: '07:58', dispositivo: 'Laptop MacBook Pro M2', vigilante: 'Luis Medina' },
  { id: '8', fecha: '2026-05-06', horaIngreso: '08:10', dispositivo: 'Laptop Lenovo ThinkPad', vigilante: 'Ana Torres' },
];

export const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha + 'T00:00:00');
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};