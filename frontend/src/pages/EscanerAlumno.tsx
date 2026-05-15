import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, RefreshCw } from 'lucide-react';
import '../styles/EscanerAlumno.css';
import senatiLogo from '../assets/Senati.png';
import { API_BASE } from '../services/api';

const EscanerAlumno: React.FC = () => {
    const [mensaje, setMensaje] = useState<string>("Iniciando cámara...");
    const [escaneado, setEscaneado] = useState<boolean>(false);
    const [errorCamara, setErrorCamara] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const procesadoRef = useRef<boolean>(false);
    const mountedRef = useRef<boolean>(true);

    const stopScanner = useCallback(async () => {
        try {
            if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
            }
            scannerRef.current?.clear();
        } catch (e) {
            console.log("Error al detener scanner:", e);
        }
    }, []);

    const startCamera = useCallback(async () => {
        if (!mountedRef.current) return;

        setErrorCamara(null);
        setMensaje("Solicitando acceso a la cámara...");

        // 1. Solicitar permiso de cámara explícitamente primero
        //    Esto es CRÍTICO en iOS Safari: la llamada a getUserMedia
        //    debe ocurrir para que el navegador muestre el diálogo de permisos.
        let stream: MediaStream | null = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });
        } catch (permErr: any) {
            // Si "environment" falla (OverconstrainedError en algunos iOS),
            // intentar sin restricción de facingMode
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            } catch (fallbackErr: any) {
                console.error("Error de permisos de cámara:", fallbackErr);
                if (fallbackErr?.name === "NotAllowedError") {
                    setErrorCamara(
                        "Permiso de cámara denegado. Ve a Configuración > Privacidad y permite el acceso a la cámara para este sitio."
                    );
                } else if (fallbackErr?.name === "NotFoundError") {
                    setErrorCamara("No se encontró ninguna cámara en este dispositivo.");
                } else if (fallbackErr?.name === "NotReadableError") {
                    setErrorCamara(
                        "La cámara está siendo usada por otra aplicación. Cierra otras apps e intenta de nuevo."
                    );
                } else {
                    setErrorCamara(
                        "No se pudo acceder a la cámara. Asegúrate de usar HTTPS y de que el navegador tenga permisos."
                    );
                }
                setMensaje("Error de cámara");
                return;
            }
        }

        // 2. Liberar el stream inmediatamente — html5-qrcode creará el suyo.
        //    Solo necesitábamos el getUserMedia para activar el diálogo de permisos.
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        if (!mountedRef.current) return;

        // 3. Limpiar instancia previa si existe
        await stopScanner();

        try {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            // Adaptamos el qrbox al tamaño de pantalla
            const viewfinderSize = Math.min(window.innerWidth * 0.7, 230);
            const config = {
                fps: 10,
                qrbox: { width: viewfinderSize, height: viewfinderSize },
                // NO incluir aspectRatio — iOS Safari lo rechaza con OverconstrainedError
            };

            // Intentar con cámara trasera primero
            try {
                await html5QrCode.start(
                    { facingMode: "environment" },
                    config,
                    handleScanSuccess,
                    () => { /* ignorar errores por frame */ }
                );
            } catch (envErr: any) {
                console.warn("Cámara trasera no disponible, intentando con cualquier cámara:", envErr);
                // Fallback: intentar con la cámara frontal o la primera disponible
                try {
                    const devices = await Html5Qrcode.getCameras();
                    if (devices && devices.length > 0) {
                        // Preferir la última cámara (usualmente la trasera en móviles)
                        const cameraId = devices[devices.length - 1].id;
                        await html5QrCode.start(
                            cameraId,
                            config,
                            handleScanSuccess,
                            () => { /* ignorar errores por frame */ }
                        );
                    } else {
                        throw new Error("No se encontraron cámaras disponibles");
                    }
                } catch (fallbackErr: any) {
                    console.error("Fallback de cámara también falló:", fallbackErr);
                    throw fallbackErr;
                }
            }

            if (mountedRef.current) {
                setMensaje("Apunta la cámara al código QR");
            }
        } catch (err: any) {
            console.error("Error crítico de cámara:", err);
            if (!mountedRef.current) return;

            if (err?.name === "NotAllowedError" || err?.message?.includes("Permission")) {
                setErrorCamara(
                    "Permiso de cámara denegado. Ve a Configuración > Privacidad y permite el acceso a la cámara para este sitio."
                );
            } else if (err?.name === "NotFoundError" || err?.name === "OverconstrainedError") {
                setErrorCamara("No se encontró una cámara compatible en este dispositivo.");
            } else if (err?.message?.includes("secure context") || err?.message?.includes("HTTPS")) {
                setErrorCamara(
                    "La cámara requiere una conexión segura (HTTPS). Contacta al administrador."
                );
            } else {
                setErrorCamara(
                    "No se pudo iniciar la cámara. Verifica permisos y que no esté en uso por otra app."
                );
            }
            setMensaje("Error de cámara");
        }
    }, []);

    // Callback de escaneo exitoso — extraído para reutilizar en ambos intentos de start()
    const handleScanSuccess = useCallback(async (decodedText: string) => {
        if (procesadoRef.current) return;
        procesadoRef.current = true;

        setMensaje("Procesando...");

        // Detener cámara
        await stopScanner();

        // Registrar asistencia en el backend
        try {
            const token = localStorage.getItem("auth_token");
            const resp = await fetch(`${API_BASE}/api/asistencia/registrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ token_qr: decodedText }),
            });

            if (resp.ok) {
                setEscaneado(true);
                setMensaje("✅ Asistencia Registrada");
            } else {
                const data = await resp.json();
                setEscaneado(true);
                setMensaje(`⚠️ ${data.error || "No se pudo registrar la asistencia"}`);
            }
        } catch {
            setEscaneado(true);
            setMensaje("Error de conexión con el servidor");
        }
    }, [stopScanner]);

    // Reintentar acceso a cámara
    const handleRetry = useCallback(() => {
        setErrorCamara(null);
        procesadoRef.current = false;
        startCamera();
    }, [startCamera]);

    useEffect(() => {
        mountedRef.current = true;

        // Dar tiempo al DOM para montar el div #reader
        const timer = setTimeout(startCamera, 500);

        return () => {
            mountedRef.current = false;
            clearTimeout(timer);
            stopScanner();
        };
    }, [startCamera, stopScanner]);

    return (
        <div className="escaner-container">
            <div className="escaner-card">
                <img src={senatiLogo} alt="SENATI" className="logo-senati" />
                <h2 className="titulo-escaner">Escaneo de Asistencia</h2>

                {!escaneado && !errorCamara && (
                    <p className="subtitulo-escaner">
                        <Camera size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        Usa la cámara trasera del celular
                    </p>
                )}

                {/* Mensaje de error de permisos */}
                {errorCamara && (
                    <div className="error-camara">
                        🔒 {errorCamara}
                        <button className="btn-reintentar" onClick={handleRetry}>
                            <RefreshCw size={14} style={{ marginRight: 4 }} />
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Viewfinder de la cámara */}
                {!escaneado && (
                    <div className="escaner-viewfinder" style={errorCamara ? { display: 'none' } : {}}>
                        <div id="reader"></div>
                        <div className="escaner-line"></div>
                    </div>
                )}

                <div className={`status-badge ${mensaje.includes("Registrada") ? 'success' : ''}`}>
                    {mensaje}
                </div>

                <button className="btn-cancelar" onClick={() => window.history.back()}>
                    {escaneado || errorCamara ? "VOLVER" : "CANCELAR"}
                </button>
            </div>
        </div>
    );
};

export default EscanerAlumno;