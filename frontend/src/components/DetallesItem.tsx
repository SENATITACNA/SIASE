import { Laptop } from 'lucide-react'
import '../styles/DetallesItem.css'

export default function DetallesItem({ alumno }) {
  return (
    <div className="card-panel detalles-panel">
      <div className="card-title">
        ITEM
      </div>
      
      {alumno ? (
        <div className="equipo-details">
          <div className="equipo-header">
            <Laptop className="equipo-icon" />
            EQUIPO ASIGNADO
          </div>
          <div className="equipo-info">
            <p><strong>Descripción:</strong> {alumno.objeto || "No registrado"}</p>
            <p><strong>Observaciones:</strong> {alumno.observacion || "Ninguna"}</p>
          </div>
        </div>
      ) : (
        <div className="empty-detalles">
          DESCRIPCION / DATOS
        </div>
      )}
    </div>
  )
}
