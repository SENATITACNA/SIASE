import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Se cambia la IP por localhost porque ahora usas tu backend local como puente
const API_BASE_URL = 'http://localhost:3000/api/tokens_vigilante';

const QRVigilante: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('Conectando al backend local...');
    const [error, setError] = useState<boolean>(false);

    const guardia_id = 1; 

    const obtenerToken = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/rotar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guardia_id })
            });

            if (!response.ok) throw new Error('Error en el servidor local');

            const data = await response.json();
            
            if (data.token) {
                setToken(data.token);
                setMensaje('Conectado a DB Remota - QR Activo');
                setError(false);
            }
        } catch (err) {
            console.error("Fallo de conexión:", err);
            setError(true);
            setMensaje('Error: No se pudo conectar con el backend en localhost:3000');
        }
    };

    useEffect(() => {
        obtenerToken()
        const intervalo = setInterval(obtenerToken, 5000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
            <h2>Panel Vigilante (Backend Local + DB Servidor)</h2>
            <p style={{ color: error ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>{mensaje}</p>
            <div style={{ padding: '20px', background: '#fff', display: 'inline-block', border: '2px solid #003366', borderRadius: '10px' }}>
                {token ? (
                    <QRCodeCanvas value={token} size={256} level="H" includeMargin={true} />
                ) : (
                    <div style={{ width: 256, height: 256, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {error ? '⚠️ Revisa tu Backend' : 'Cargando QR...'}
                    </div>
                )}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
                Comunicándose con: {API_BASE_URL}/rotar
            </p>
        </div>
    );
};

export default QRVigilante;