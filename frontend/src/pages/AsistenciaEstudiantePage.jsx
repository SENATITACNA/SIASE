import React, { useState } from 'react';
import AsistenciaCard from '../components/Asistencia_vista_estudiante/AsistenciaCard_vista_estudiante';
import Modal_detalle from '../components/Asistencia_vista_estudiante/Modal_detalle';
import '../styles/AsistenciaUI_vista_del_estudiante.css';

const AsistenciaEstudiantePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  // Datos de prueba para que ver 
  const misRegistros = [
    { id: 1, equipo: "SENATI-LAB-01", hora_llegada: "08:05 AM", hora_salida: "01:15 PM", fecha: "2026-05-09" },
    { id: 2, equipo: "SENATI-LAB-02", hora_llegada: "08:10 AM", hora_salida: "--:--", fecha: "2026-05-09" },
  ];

  const abrirDetalle = (item) => {
    setSeleccionado(item);
    setModalOpen(true);
  };

  return (
    <div className="asistencia-container">
      <aside className="sidebar-estudiante">
        <div className="asistencia-btn-main text-blue-600">Asistencia</div>
        <div className="mt-auto bg-white p-4 rounded-xl mb-6">
           <div className="w-24 h-24 bg-gray-200">QR</div>
        </div>
        <button className="bg-white px-8 py-2 rounded-full font-bold shadow">Cerrar Sesión</button>
      </aside>

      <main className="lista-registros">
        <h1 className="text-center text-3xl mb-10 font-light">Registro Asistencia</h1>
        <div className="flex justify-center mb-10">
            <input className="bg-gray-400 rounded-full px-20 py-3 w-3/4 text-center placeholder-black" placeholder="BUSCAR POR FECHA" />
        </div>

        {misRegistros.map(reg => (
          <AsistenciaCard key={reg.id} registro={reg} onClick={abrirDetalle} />
        ))}
      </main>

      <Modal_detalle isOpen={modalOpen} onClose={() => setModalOpen(false)} data={seleccionado} />
    </div>
  );
};

export default AsistenciaEstudiantePage;