import type { Alumno } from "../types/alumnos";

interface Props {
  alumno: Alumno;
}

function AlumnoForm({ alumno }: Props) {
  return (
    <div className="contenedor-estudiante">
      <div className="card-estudiante">
        
        {/* Header con título */}
        <div className="header-form">
          <h1 className="titulo-alumno">Ficha del Alumno</h1>
          <p className="subtitulo">Información académica y personal</p>
        </div>

        {/* Sección: Datos Personales */}
        <div className="seccion">
          <div className="seccion-header">
            <span className="seccion-numero">01</span>
            <h2 className="seccion-titulo">Datos Personales</h2>
          </div>
          <div className="seccion-contenido dos-columnas">
            <div className="grupo-info">
              <label>Nombres</label>
              <div className="dato">{alumno.nombres}</div>
            </div>
            <div className="grupo-info">
              <label>Apellidos</label>
              <div className="dato">{alumno.apellidos}</div>
            </div>
          </div>
        </div>

        {/* Sección: Datos Académicos */}
        <div className="seccion">
          <div className="seccion-header">
            <span className="seccion-numero">02</span>
            <h2 className="seccion-titulo">Datos Académicos</h2>
          </div>
          <div className="seccion-contenido dos-columnas">
            <div className="grupo-info">
              <label>ID SENATI</label>
              <div className="dato id-senati">{alumno.idsenati}</div>
            </div>
            <div className="grupo-info">
              <label>Carrera</label>
              <div className="dato">{alumno.carrera}</div>
            </div>
            <div className="grupo-info">
              <label>Semestre</label>
              <div className="dato semestre">{alumno.semestre}° Semestre</div>
            </div>
          </div>
        </div>

        {/* Footer con metadatos */}
        <div className="footer-form">
          <div className="meta-info">
            <span className="meta-label">Registro vigente</span>
            <span className="meta-fecha">Actualizado recientemente</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AlumnoForm;