// In development, Vite proxies /api and /login to the backend.
// In production (built bundle served as static files), the proxy doesn't exist,
// so we must use the full backend URL from the environment variable.
const isProd = import.meta.env.PROD;
const BASE = isProd ? import.meta.env.VITE_API_URL : '';

export const API_BASE = BASE;