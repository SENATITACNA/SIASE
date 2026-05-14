import { useState, useEffect, useCallback } from 'react';
import { Calendar, GraduationCap, Layers, Filter, RefreshCw, ClipboardList } from 'lucide-react';
import Navbar from '../components/Navbar';
import NavegacionSuperior from '../components/NavegacionSuperior';
import { API_BASE } from '../services/api';
import '../styles/App.css';
import '../styles/AsistenciaVigilante.css';

interface Asistencia {
    id: number;
    fecha: string;
    hora_ingreso: string;
    hora_salida: string | null;
    alumno: string;
    idsenati: string;
    semestre: number;
    guardia: string;
    carrera: string;
    carrera_id: number;
}

interface Carrera {
    id: number;
    nombre: string;
}

function AsistenciaVigilante() {
    const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [guardia, setGuardia] = useState<any>({ nombre: "Cargando...", rol: "Oficial de Guardia", id: "" });
    const [loading, setLoading] = useState(false);

    // Filtros
    const [searchId, setSearchId] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");
    const [filtroCarrera, setFiltroCarrera] = useState("");
    const [filtroSemestre, setFiltroSemestre] = useState("");

    const fetchAsistencias = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (searchId) queryParams.append("idsenati", searchId);
            if (filtroFecha) queryParams.append("fecha", filtroFecha);
            if (filtroCarrera) queryParams.append("carrera_id", filtroCarrera);
            if (filtroSemestre) queryParams.append("semestre", filtroSemestre);

            const res = await fetch(`${API_BASE}/api/asistencia?${queryParams.toString()}`);
            const data = await res.json();
            setAsistencias(data);
        } catch (err) {
            console.error("Error fetching asistencias:", err);
        } finally {
            setLoading(false);
        }
    }, [searchId, filtroFecha, filtroCarrera, filtroSemestre]);

    useEffect(() => {
        // Cargar carreras
        fetch(`${API_BASE}/api/carreras`)
            .then(res => res.json())
            .then(data => setCarreras(data))
            .catch(err => console.error("Error fetching carreras:", err));

        // Cargar info del guardia
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            const vigilanteId = user.guardia_id ?? user.id;
            fetch(`${API_BASE}/api/vigilantes/${vigilanteId}`)
                .then(res => res.json())
                .then(data => {
                    if (data && (data.vigilante_id || data.guardia_id)) {
                        setGuardia({
                            nombre: data.nombre + " " + data.apellido,
                            rol: "ID: " + (data.vigilante_id || data.guardia_id),
                            id: data.id,
                            turno: data.turno
                        });
                    }
                })
                .catch(err => console.error("Error fetching vigilante:", err));
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAsistencias();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchAsistencias]);

    return (
        <div className="layout-wrapper">
            <Navbar />
            <div className="app-container">
                <div className="main-content">
                    <NavegacionSuperior guardia={guardia} onSearch={setSearchId} />
                    <div className="content-area">
                        <div className="page-header">
                            <ClipboardList size={28} className="header-icon" />
                            <div>
                                <h1>Control de Asistencia</h1>
                                <p>Monitoreo en tiempo real de ingresos y salidas</p>
                            </div>
                        </div>

                        {/* Seccion de Filtros */}
                        <div className="card-panel glass-card filters-panel">
                            <div className="card-title">
                                <Filter size={18} />
                                <span>Filtros Avanzados</span>
                            </div>
                            <div className="filters-grid">
                                <div className="filter-item">
                                    <label><Calendar size={14} /> Fecha</label>
                                    <input 
                                        type="date" 
                                        value={filtroFecha} 
                                        onChange={(e) => setFiltroFecha(e.target.value)}
                                        className="custom-input"
                                    />
                                </div>
                                <div className="filter-item">
                                    <label><GraduationCap size={14} /> Carrera</label>
                                    <select 
                                        value={filtroCarrera} 
                                        onChange={(e) => setFiltroCarrera(e.target.value)}
                                        className="custom-select"
                                    >
                                        <option value="">Todas las carreras</option>
                                        {carreras.map(c => (
                                            <option key={c.id} value={c.id}>{c.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label><Layers size={14} /> Semestre</label>
                                    <select 
                                        value={filtroSemestre} 
                                        onChange={(e) => setFiltroSemestre(e.target.value)}
                                        className="custom-select"
                                    >
                                        <option value="">Todos los semestres</option>
                                        {[1,2,3,4,5,6].map(s => (
                                            <option key={s} value={s}>{s}° Semestre</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de Resultados */}
                        <div className="card-panel glass-card table-panel">
                            <div className="card-header-row">
                                <div className="card-title">
                                    <RefreshCw size={18} className={loading ? "spin" : ""} />
                                    <span>Lista Registrada</span>
                                </div>
                                <span className="results-count">{asistencias.length} registros</span>
                            </div>
                            
                            <div className="table-responsive">
                                <table className="asistencia-table">
                                    <thead>
                                        <tr>
                                            <th>ID SENATI</th>
                                            <th>Nombre Completo</th>
                                            <th>Carrera</th>
                                            <th>Sem.</th>
                                            <th>Fecha</th>
                                            <th>Ingreso</th>
                                            <th>Salida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {asistencias.length > 0 ? (
                                            asistencias.map((a) => (
                                                <tr key={a.id}>
                                                    <td className="idsenati-cell">{a.idsenati}</td>
                                                    <td className="name-cell">{a.alumno}</td>
                                                    <td>{a.carrera}</td>
                                                    <td><span className="semester-badge">{a.semestre}</span></td>
                                                    <td>{new Date(a.fecha).toLocaleDateString()}</td>
                                                    <td className="time-in">{a.hora_ingreso}</td>
                                                    <td className="time-out">{a.hora_salida || '--:--'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="empty-state">
                                                    {loading ? "Cargando datos..." : "No se encontraron registros de asistencia"}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsistenciaVigilante;
