import { Search, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/NavegacionSuperior.css'

export default function NavegacionSuperior({ guardia, onSearch }) {
  const navigate = useNavigate();

  return (
    <div className="navegacion-superior">
      <div className="guardia-info">
        <div className="guardia-avatar">
          <User size={24} />
        </div>
        <div className="guardia-details">
          <span className="guardia-name">{guardia?.nombre || "NOMBRE GUARDIA"}</span>
          <span className="guardia-role">{guardia?.rol || "Dato extra"}</span>
          {guardia?.turno && <span className="guardia-role" style={{marginTop: '2px'}}>Turno {guardia.turno}</span>}
        </div>
      </div>
      
      <div className="nav-actions">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Buscar ID Senati..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <Search className="search-icon" />
        </div>
      </div>
    </div>
  )
}
