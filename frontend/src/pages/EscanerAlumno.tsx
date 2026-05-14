import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import '../styles/EscanerAlumno.css';
import senatiLogo from '../assets/Senati.png';

const EscanerAlumno: React.FC = () => {
    const [mensaje, setMensaje] = useState<string>("Iniciando cámara...");
    const [escaneado, setEscaneado] = useState<boolean>(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const procesadoRef = useRef<boolean>(false); // Evita múltiples escaneos simultáneos

    useEffect(() => {
        const startCamera = async () => {
            try {
                const html5QrCode = new Html5Qrcode("reader");
                scannerRef.current = html5QrCode;
                
                const config = { fps: 15, qrbox: { width: 250, height: 250 } };

                await html5QrCode.start(
                    { facingMode: "environment" }, 
                    config,
                    async (decodedText) => {
                        // Bloqueo para procesar solo una vez
                        if (procesadoRef.current) return;
                        procesadoRef.current = true;

                        setMensaje("Procesando...");
                        console.log("Código QR:", decodedText);

                        // 1. Detener la cámara inmediatamente
                        if (scannerRef.current && scannerRef.current.isScanning) {
                            await scannerRef.current.stop();
                            scannerRef.current.clear();
                        }

                        // 2. Actualizar estado visual
                        setEscaneado(true);
                        setMensaje("Asistencia Registrada");
                    },
                    (_errorMessage) => { /* Escaneando... */ }
                );
                
                setMensaje("Esperando código...");
            } catch (err) {
                console.error("Error crítico de cámara:", err);
                setMensaje("Error: No se pudo acceder a la cámara");
            }
        };

        const timer = setTimeout(startCamera, 1000);

        return () => {
            clearTimeout(timer);
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(e => console.log(e));
            }
        };
    }, []);

    return (
        <div className="escaner-container">
            <div className="escaner-card">
                <img src={senatiLogo} alt="SENATI" className="logo-senati" />
                <h2 className="titulo-escaner">Escaneo de Asistencia</h2>
                
                {/* Ocultar el visor si ya se escaneó con éxito */}
                {!escaneado && (
                    <div className="escaner-viewfinder">
                        <div id="reader"></div>
                        <div className="escaner-line"></div>
                    </div>
                )}

                <div className={`status-badge ${mensaje === "Asistencia Registrada" ? 'success' : ''}`}>
                    {mensaje}
                </div>

                <button className="btn-cancelar" onClick={() => window.history.back()}>
                    {escaneado ? "VOLVER" : "CANCELAR"}
                </button>
            </div>
        </div>
    );
};

export default EscanerAlumno;