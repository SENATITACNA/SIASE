import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode'; // <--- Usamos el objeto puro
import '../styles/EscanerAlumno.css';
import senatiLogo from '../assets/Senati.png';

const EscanerAlumno: React.FC = () => {
    const [mensaje, setMensaje] = useState<string>("Iniciando cámara...");

    useEffect(() => {
        let html5QrCode: Html5Qrcode | null = null;

        const startCamera = async () => {
            try {
                html5QrCode = new Html5Qrcode("reader");
                
                const config = { fps: 15, qrbox: { width: 250, height: 250 } };

                // Forzamos el inicio de la cámara trasera directamente
                await html5QrCode.start(
                    { facingMode: "environment" }, 
                    config,
                    (decodedText) => {
                        setMensaje("¡Código detectado!");
                        console.log(decodedText);
                    },
                    (_errorMessage) => { /* Escaneando... */ }
                );
                
                setMensaje("Esperando código...");
            } catch (err) {
                console.error("Error crítico de cámara:", err);
                setMensaje("Error: No se pudo acceder a la cámara");
            }
        };

        // Delay de seguridad para que el DOM esté listo
        const timer = setTimeout(startCamera, 1000);

        return () => {
            clearTimeout(timer);
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().catch(e => console.log(e));
            }
        };
    }, []);

    return (
        <div className="escaner-container">
            <div className="escaner-card">
                <img src={senatiLogo} alt="SENATI" className="logo-senati" />
                <h2 className="titulo-escaner">Escaneo de Asistencia</h2>
                
                <div className="escaner-viewfinder">
                    <div id="reader"></div>
                    <div className="escaner-line"></div>
                </div>

                <div className={`status-badge ${mensaje.includes("detectado") ? 'success' : ''}`}>
                    {mensaje}
                </div>

                <button className="btn-cancelar" onClick={() => window.history.back()}>
                    CANCELAR
                </button>
            </div>
        </div>
    );
};

export default EscanerAlumno;