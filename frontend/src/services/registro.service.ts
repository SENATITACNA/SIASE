const API_URL = 'http://190.241.217.53:3000';

export const obtenerAlumno = async (id: string) => {
    const resp = await fetch(`${API_URL}/alumnos/${id}`);
    return resp.ok ? await resp.json() : null;
};

export const obtenerDispositivosPorAlumno = async (alumnoId: string) => {
    const resp = await fetch(`${API_URL}/dispositivos-alumno/${alumnoId}`);
    return resp.ok ? await resp.json() : [];
};

export const obtenerInstructores = async () => {
    const resp = await fetch(`${API_URL}/instructores`);
    return resp.ok ? await resp.json() : [];
};