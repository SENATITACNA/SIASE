import axios from "axios";
import type { Asistencia, FiltrosAsistencia } from "../interfaces/asistencia.interface";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: adjunta el token JWT en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: maneja errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const asistenciaService = {
  /**
   * Obtiene el historial de asistencia del estudiante autenticado
   */
  async getMiHistorial(): Promise<Asistencia[]> {
    const { data } = await api.get<Asistencia[]>("/asistencia/mi-historial");
    return data;
  },

  /**
   * Filtra asistencias por vigilante, fecha y/o equipo
   */
  async buscarAsistencias(filtros: Partial<FiltrosAsistencia>): Promise<Asistencia[]> {
    const params = new URLSearchParams();
    if (filtros.vigilante) params.append("vigilante", filtros.vigilante);
    if (filtros.fecha) params.append("fecha", filtros.fecha);
    if (filtros.equipo) params.append("equipo", filtros.equipo);

    const { data } = await api.get<Asistencia[]>(`/asistencia/buscar?${params.toString()}`);
    return data;
  },

  /**
   * Obtiene los equipos disponibles para el filtro
   */
  async getEquipos(): Promise<string[]> {
    const { data } = await api.get<string[]>("/equipos");
    return data;
  },

  /**
   * Obtiene los vigilantes disponibles para el filtro
   */
  async getVigilantes(): Promise<string[]> {
    const { data } = await api.get<string[]>("/vigilantes");
    return data;
  },
};