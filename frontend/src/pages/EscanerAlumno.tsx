import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera } from 'lucide-react';
import '../styles/EscanerAlumno.css';
import senatiLogo from '../assets/Senati.png';
import { API_BASE } from '../services/api';

const EscanerAlumno: React.FC = () => {
    const [mensaje, setMensaje] = useState<string>("Iniciando cámara...");
    const [escaneado, setEscaneado] = useState<boolean>(false);
    const [errorCamara, setErrorCamara] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const procesadoRef = useRef<boolean>(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const html5QrCode = new Html5Qrcode("reader");
                scannerRef.current = html5QrCode;

                // Adaptamos el qrbox al tamaño de pantalla
                const viewfinderSize = Math.min(window.innerWidth * 0.75, 250);
                const config = {
                    fps: 15,
                    qrbox: { width: viewfinderSize, height: viewfinderSize },
                    aspectRatio: 1.0,
                };

                await html5QrCode.start(
                    { facingMode: "environment" }, // cámara trasera en móvil
                    config,
                    async (decodedText: string) => {
                        if (procesadoRef.current) return;
                        procesadoRef.current = true;

                        setMensaje("Procesando...");

                        // Detener cámara
                        if (scannerRef.current?.isScanning) {
                            await scannerRef.current.stop();
                            scannerRef.current.clear();
                        }

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
                    },
                    (_errorMessage: string) => { /* ignorar errores de frame */ }
                );

                setMensaje("Apunta la cámara trasera al código QR");
            } catch (err: any) {
                console.error("Error crítico de cámara:", err);
                // Mensajes de error amigables según el tipo de error
                if (err?.message?.includes("Permission") || err?.name === "NotAllowedError") {
                    setErrorCamara("Permiso de cámara denegado. Ve a Configuración > Privacidad y permite el acceso a la cámara para este sitio.");
                } else if (err?.name === "NotFoundError") {
                    setErrorCamara("No se encontró ninguna cámara en este dispositivo.");
                } else {
                    setErrorCamara("No se pudo acceder a la cámara. Verifica que no esté siendo usada por otra aplicación.");
                }
                setMensaje("Error de cámara");
            }
        };

        const timer = setTimeout(startCamera, 800);

        return () => {
            clearTimeout(timer);
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch((e: unknown) => console.log(e));
            }
        };
    }, []);

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
                    </div>
                )}

                {/* Viewfinder de la cámara */}
                {!escaneado && !errorCamara && (
                    <div className="escaner-viewfinder">
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