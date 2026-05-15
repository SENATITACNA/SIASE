import { API_BASE } from './api';

const API = `${API_BASE}/api`;

export const obtenerAlumno = async (id: string) => {
    const response = await fetch(`${API}/alumnos/${id}`, {
  method: "GET",
  credentials: "include"
})
    return await response.json()
}

export const obtenerInstructores = async () => {
    const response = await fetch(`${API}/instructores`, {
    method: "GET", 
    credentials: "include"
})
    return await response.json()
}

export const registrarDispositivo = async (data: any) => {
    const response = await fetch(`${API}/registro-dispositivo`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
}
