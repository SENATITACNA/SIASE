import { Calendar, ChevronRight } from 'lucide-react'
import '../styles/ResultadosBusqueda.css'
import type { Alumno } from '../types'

export default function ResultadosBusqueda({ alumnos, selectedAlumno, onSelect }: { alumnos: Alumno[], selectedAlumno: Alumno | null, onSelect: (alumno: Alumno) => void }) {
  return (
    <div className="card-panel resultados-panel">
      <div className="card-title">
        <span className="title-dot"></span>
        LISTA DE ALUMNOS
      </div>
      
      <div className="resultados-list">
        <div className="resultados-grid">
          {alumnos.map((alumno: Alumno) => {
            const isSelected = selectedAlumno?.id === alumno.id;
            
            const getEstadoConfig = (estado?: number) => {
              switch (estado) {
                case 0: return { label: 'EN ESPERA', class: 'espera' };
                case 1: return { label: 'INGRESO', class: 'ingreso' };
                case 2: return { label: 'SALIDA', class: 'salida' };
                default: return { label: 'N/A', class: '' };
              }
            };
            
            const config = getEstadoConfig(alumno.estado);
            
            return (
              <div 
                key={alumno.id}
                className={`alumno-card ${isSelected ? 'selected' : ''} ${alumno.estado === 2 ? 'finalized' : ''}`}
                onClick={() => onSelect(alumno)}
              >
                <div className="card-header">
                  <span className="badge-id">
                    {alumno.idsenati}
                  </span>
                  <span className={`badge-status ${config.class}`}>
                    <span className={`status-dot ${config.class}`}></span>
                    {config.label}
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="card-subtitle">ALUMNO</div>
                  <div className="alumno-name">
                    {alumno.alumno}
                  </div>
                </div>
                
                <div className="card-footer">
                  <div className="date-info">
                    <Calendar className="date-icon" />
                    <span>{new Date(alumno.fecha_envio ?? '').toLocaleString()}</span>
                  </div>
                  <ChevronRight className="chevron-icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}