import React, { useEffect, useState } from 'react';
import { User, Menu } from 'lucide-react';
import * as RegistroService from '../services/Registro.service';
import '../styles/Formulario.css';

const RegistroForm = () => {
    const [studentId, setStudentId] = useState('');
    const [dispositivos, setDispositivos] = useState<any[]>([]);
    const [instructores, setInstructores] = useState<any[]>([]);
    
    const [alumno, setAlumno] = useState({ nombre_completo: '', carrera: '', semestre: '' });
    const [detalleDisp, setDetalleDisp] = useState({ marca: '', modelo: '', serie: '' });

    useEffect(() => {
        RegistroService.obtenerInstructores().then(setInstructores);
    }, []);

    useEffect(() => {
        if (studentId.length >= 4) {
            RegistroService.obtenerAlumno(studentId).then(data => {
                if (data) {
                    setAlumno(data);
                    RegistroService.obtenerDispositivosPorAlumno(studentId).then(setDispositivos);
                }
            });
        }
    }, [studentId]);

    const handleSelectDisp = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const encontrado = dispositivos.find(d => d.id === parseInt(e.target.value));
        if (encontrado) {
            setDetalleDisp({
                marca: encontrado.marca,
                modelo: encontrado.modelo,
                serie: encontrado.numero_serie
            });
        }
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="sidebar-header"><Menu size={28} /> <span>ALUMNO</span></div>
                <div className="avatar-circle"><User size={70} color="#1a41cc" /></div>
                <div className="nav-item-active">FORMULARIO</div>
            </aside>

            <main className="main-content">
                <h2>Datos del estudiante</h2>
                <div className="grid-inputs">
                    <input type="text" placeholder="ID del estudiante" className="input-field" 
                           onChange={(e) => setStudentId(e.target.value)} />
                    <div className="auto-field">{alumno.nombre_completo || ''}</div>
                    <div className="auto-field">{alumno.carrera || ''}</div>
                    <div className="auto-field">{alumno.semestre || ''}</div>
                </div>

                <h2>Dispositivo</h2>
                <div className="grid-inputs">
                    <select className="input-field" onChange={handleSelectDisp}>
                        <option value="">Elegir Dispositivo</option>
                        {dispositivos.map(d => <option key={d.id} value={d.id}>{d.tipo}</option>)}
                    </select>
                    <div className="auto-field">{detalleDisp.marca || ''}</div>
                    <div className="auto-field">{detalleDisp.modelo || ''}</div>
                    <div className="auto-field">{detalleDisp.serie || ''}</div>
                </div>

                <div className="footer-form">
                    <div className="footer-item">
                        <p>fecha</p>
                        <input type="date" className="input-field" style={{width: '250px'}} />
                    </div>
                    <div className="footer-item">
                        <p>instructor</p>
                        <select className="input-field" style={{width: '300px'}}>
                            <option value="">Elegir Instructor</option>
                            {instructores.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                        </select>
                    </div>
                </div>

                <button className="register-btn">ENVIAR</button>
            </main>
        </div>
    );
};

export default RegistroForm;