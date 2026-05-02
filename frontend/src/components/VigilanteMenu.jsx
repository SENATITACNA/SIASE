import { useState } from "react";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "escanear", label: "Escanear QR", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  { id: "lista", label: "Lista asistencia", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  { id: "manual", label: "Formulario manual", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
];

// TODO: reemplazar con fetch a la API/base de datos
const INGRESOS = [];

function Icon({ path, size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function ScannerSimulado({ onScan }) {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      const estudiante = INGRESOS[Math.floor(Math.random() * INGRESOS.length)];
      setResult(estudiante);
      onScan && onScan(estudiante);
    }, 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: 340 }}>
        <div style={{ fontSize: 14, color: "#546E7A", fontWeight: 500 }}>Cámara de escaneo QR</div>
        <div style={{ width: 220, height: 220, background: "#0D2B6B", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12, border: "2px solid #1E88E5", borderRadius: 8, opacity: 0.7 }} />
          <div style={{ position: "absolute", top: 12, left: 12, width: 24, height: 24, borderTop: "3px solid #1E88E5", borderLeft: "3px solid #1E88E5", borderRadius: "4px 0 0 0" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderTop: "3px solid #1E88E5", borderRight: "3px solid #1E88E5", borderRadius: "0 4px 0 0" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 24, height: 24, borderBottom: "3px solid #1E88E5", borderLeft: "3px solid #1E88E5", borderRadius: "0 0 0 4px" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 24, height: 24, borderBottom: "3px solid #1E88E5", borderRight: "3px solid #1E88E5", borderRadius: "0 0 4px 0" }} />
          {scanning && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #1E88E5, transparent)", animation: "scan 1s linear infinite" }} />
          )}
          <Icon path="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" size={60} color="rgba(144,202,249,0.3)" />
        </div>

        {!scanned ? (
          <button onClick={handleScan} disabled={scanning} style={{ padding: "12px 32px", background: scanning ? "#78909C" : "#1565C0", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: scanning ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {scanning ? "Escaneando..." : "Simular escaneo QR"}
          </button>
        ) : (
          <div style={{ width: "100%", background: "#E8F5E9", border: "1px solid #A5D6A7", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#2E7D32", fontWeight: 600, marginBottom: 6 }}>✓ QR Verificado</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1B5E20" }}>{result?.nombre}</div>
            <div style={{ fontSize: 12, color: "#388E3C" }}>ID: {result?.id}</div>
            <button onClick={() => { setScanned(false); setResult(null); }} style={{ marginTop: 10, padding: "6px 16px", background: "#1565C0", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              Escanear otro
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes scan { 0% { top: 12px; } 50% { top: calc(100% - 15px); } 100% { top: 12px; } }`}</style>
    </div>
  );
}

export default function VigilanteMenu() {
  const [active, setActive] = useState("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ingresos, setIngresos] = useState(INGRESOS);

  const today = new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const hora = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

  const handleScan = (est) => {
    setIngresos(prev => prev.find(i => i.id === est.id) ? prev : [{ ...est, hora: hora }, ...prev]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#F0F4F8" }}>
      {/* TOPBAR */}
      <header style={{ background: "#0D2B6B", display: "flex", alignItems: "stretch", height: 56, borderBottom: "2px solid #1E88E5", flexShrink: 0 }}>
        <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px", minWidth: 150 }}>
          <img src="./descarga.png" alt="SENATI" style={{ height: 36, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
          <div style={{ display: "none", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "#1565C0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>S</div>
            <span style={{ color: "#1565C0", fontWeight: 800, fontSize: 16 }}>SENATI</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, padding: "0 28px", color: "#fff" }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>Panel Control Vigilancia</span>
          <span style={{ fontSize: 12, color: "#90CAF9", textTransform: "capitalize" }}>{today}</span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <aside style={{ width: sidebarOpen ? 220 : 60, background: "#0D2B6B", padding: "20px 0", display: "flex", flexDirection: "column", flexShrink: 0, transition: "width 0.2s", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 12, whiteSpace: "nowrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0D47A1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>VG</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Vigilante</div>
                <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, padding: "2px 7px", borderRadius: 10, marginTop: 2, width: "fit-content", background: "#0D47A1", color: "#64B5F6" }}>Personal Seguridad</div>
              </div>
            )}
          </div>

          {sidebarOpen && <div style={{ fontSize: 10, fontWeight: 600, color: "#546E7A", textTransform: "uppercase", letterSpacing: 1, padding: "8px 18px 4px" }}>Control</div>}

          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", cursor: "pointer", color: active === item.id ? "#fff" : "#90CAF9", fontSize: 13, borderLeft: active === item.id ? "3px solid #1E88E5" : "3px solid transparent", background: active === item.id ? "rgba(30,136,229,0.2)" : "none", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit", fontWeight: active === item.id ? 500 : 400, whiteSpace: "nowrap", transition: "all 0.15s" }}>
              <span style={{ flexShrink: 0 }}><Icon path={item.icon} size={16} /></span>
              {sidebarOpen && item.label}
            </button>
          ))}

          <button onClick={() => setSidebarOpen(o => !o)} style={{ margin: "8px 18px 0", padding: "8px 10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#90CAF9", cursor: "pointer", fontSize: 11, fontFamily: "inherit", whiteSpace: "nowrap" }}>
            {sidebarOpen ? "← Colapsar" : "→"}
          </button>

          <button style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", color: "#EF9A9A", fontSize: 13, cursor: "pointer", border: "none", background: "none", width: "100%", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={16} />
            {sidebarOpen && "Cerrar sesión"}
          </button>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, overflowY: "auto", background: "#F0F4F8" }}>
          <div style={{ background: "#fff", borderBottom: "1px solid #90CAF9", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0D2B6B" }}>
                {active === "inicio" && "Panel de Vigilancia"}
                {active === "escanear" && "Escanear QR"}
                {active === "lista" && "Lista de Asistencia"}
                {active === "manual" && "Formulario Manual"}
              </div>
              <div style={{ fontSize: 12, color: "#78909C", marginTop: 2, textTransform: "capitalize" }}>{today}</div>
            </div>
            <div style={{ background: "#E3F2FD", border: "1px solid #90CAF9", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#1565C0", fontWeight: 500 }}>
              {ingresos.length} Presentes
            </div>
          </div>

          <div style={{ padding: 32 }}>
            {/* INICIO */}
            {active === "inicio" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                  {[
                    { val: ingresos.length, label: "Ingresos hoy", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "#1565C0" },
                    { val: ingresos.filter(i => i.estado === "Entrada").length, label: "A tiempo", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "#2E7D32" },
                    { val: ingresos.filter(i => i.estado === "Tardanza").length, label: "Tardanzas", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "#F57F17" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon path={s.icon} size={22} color={s.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#0D2B6B" }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: "#78909C" }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Accesos rápidos */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16, marginBottom: 28 }}>
                  {NAV_ITEMS.filter(n => n.id !== "inicio").map(item => (
                    <div key={item.id} onClick={() => setActive(item.id)} style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 16, padding: "22px 20px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10, transition: "all 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E88E5"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#90CAF9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon path={item.icon} size={20} color="#1565C0" />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0D2B6B" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Últimos ingresos */}
                <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ background: "#E3F2FD", padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#1565C0" }}>Últimos ingresos</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#F8FAFC" }}>
                        {["ID", "Nombre", "Hora", "Estado"].map(h => (
                          <th key={h} style={{ padding: "10px 20px", fontSize: 11, color: "#78909C", textAlign: "left", borderBottom: "1px solid #EEF2F7" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ingresos.length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ padding: "32px 20px", textAlign: "center", fontSize: 13, color: "#78909C" }}>
                            Sin ingresos registrados aún
                          </td>
                        </tr>
                      ) : ingresos.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #F5F7FA" }}>
                          <td style={{ padding: "12px 20px", fontSize: 12, color: "#78909C", fontFamily: "monospace" }}>{row.id}</td>
                          <td style={{ padding: "12px 20px", fontSize: 13, color: "#0D2B6B", fontWeight: 500 }}>{row.nombre}</td>
                          <td style={{ padding: "12px 20px", fontSize: 13, color: "#546E7A" }}>{row.hora}</td>
                          <td style={{ padding: "12px 20px" }}>
                            <span style={{ background: row.estado === "Entrada" ? "#E8F5E9" : "#FFF8E1", color: row.estado === "Entrada" ? "#2E7D32" : "#F57F17", border: `1px solid ${row.estado === "Entrada" ? "#A5D6A7" : "#FFE082"}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                              {row.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ESCANEAR */}
            {active === "escanear" && <ScannerSimulado onScan={handleScan} />}

            {/* LISTA */}
            {active === "lista" && (
              <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: "#E3F2FD", padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#1565C0", display: "flex", justifyContent: "space-between" }}>
                  <span>Asistencia del día — {today}</span>
                  <span style={{ fontWeight: 400, color: "#546E7A" }}>{ingresos.length} registros</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC" }}>
                      {["ID Estudiante", "Nombre", "Hora de ingreso", "Estado"].map(h => (
                        <th key={h} style={{ padding: "10px 20px", fontSize: 11, color: "#78909C", textAlign: "left", borderBottom: "1px solid #EEF2F7" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ingresos.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: "32px 20px", textAlign: "center", fontSize: 13, color: "#78909C" }}>
                          Sin ingresos registrados aún
                        </td>
                      </tr>
                    ) : ingresos.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ padding: "12px 20px", fontSize: 12, color: "#78909C", fontFamily: "monospace" }}>{row.id}</td>
                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#0D2B6B", fontWeight: 500 }}>{row.nombre}</td>
                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#546E7A" }}>{row.hora}</td>
                        <td style={{ padding: "12px 20px" }}>
                          <span style={{ background: row.estado === "Entrada" ? "#E8F5E9" : "#FFF8E1", color: row.estado === "Entrada" ? "#2E7D32" : "#F57F17", border: `1px solid ${row.estado === "Entrada" ? "#A5D6A7" : "#FFE082"}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                            {row.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* MANUAL */}
            {active === "manual" && (
              <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 16, padding: 28, maxWidth: 480 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0D2B6B", marginBottom: 20 }}>Registro manual de ingreso</div>
                {[
                  { label: "ID / Código de estudiante", placeholder: "Ej. 001611258" },
                  { label: "Nombre completo", placeholder: "Nombre del estudiante" },
                  { label: "Hora de ingreso", placeholder: hora, type: "time" },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, color: "#546E7A", marginBottom: 6, display: "block", fontWeight: 500 }}>{field.label}</label>
                    <input type={field.type || "text"} placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #90CAF9", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#0D2B6B", outline: "none", background: "#FAFBFF" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: "#546E7A", marginBottom: 6, display: "block", fontWeight: 500 }}>Estado</label>
                  <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #90CAF9", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#0D2B6B", outline: "none", background: "#FAFBFF" }}>
                    <option>Entrada</option>
                    <option>Tardanza</option>
                    <option>Salida</option>
                  </select>
                </div>
                <button style={{ width: "100%", padding: "12px", background: "#1565C0", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Registrar ingreso
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
