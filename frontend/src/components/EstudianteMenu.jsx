import { useState } from "react";

const SENATI_LOGO = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpolygon points='100,10 170,50 170,150 100,190 30,150 30,50' fill='%231565C0'/%3E%3Ctext x='100' y='115' text-anchor='middle' fill='white' font-size='60' font-weight='bold' font-family='Arial'%3ES%3C/text%3E%3C/svg%3E`;

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "qr", label: "Mi código QR", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  { id: "asistencia", label: "Mi asistencia", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { id: "laptop", label: "Registro laptop", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

function Icon({ path, size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function QRCode({ value = "001611258" }) {
  const size = 180;
  const cellSize = 6;
  const cells = 21;
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const grid = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      if (r < 7 && c < 7) return 1;
      if (r < 7 && c >= cells - 7) return 1;
      if (r >= cells - 7 && c < 7) return 1;
      return ((seed * (r + 1) * (c + 1) * 31) % 17) < 8 ? 1 : 0;
    })
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cells * cellSize} ${cells * cellSize}`}>
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#0D2B6B" /> : null
        )
      )}
    </svg>
  );
}

const ASISTENCIA = [
  { fecha: "Lun 28 Abr", estado: "Presente", hora: "08:02" },
  { fecha: "Mar 29 Abr", estado: "Presente", hora: "07:58" },
  { fecha: "Mié 30 Abr", estado: "Tardanza", hora: "08:18" },
  { fecha: "Jue 01 May", estado: "Presente", hora: "08:01" },
  { fecha: "Vie 02 May", estado: "Presente", hora: "07:55" },
];

export default function EstudianteMenu() {
  const [active, setActive] = useState("inicio");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const today = new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

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
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>Portal Estudiante</span>
          <span style={{ fontSize: 12, color: "#90CAF9", textTransform: "capitalize" }}>{today}</span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <aside style={{ width: sidebarOpen ? 220 : 60, background: "#0D2B6B", padding: "20px 0", display: "flex", flexDirection: "column", flexShrink: 0, transition: "width 0.2s", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 12, whiteSpace: "nowrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#1565C0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>JE</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Jorge Eduardo</div>
                <div style={{ fontSize: 11, color: "#90CAF9" }}>ID: 001611258</div>
                <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, padding: "2px 7px", borderRadius: 10, marginTop: 2, width: "fit-content", background: "#1565C0", color: "#90CAF9" }}>Estudiante</div>
              </div>
            )}
          </div>

          {sidebarOpen && <div style={{ fontSize: 10, fontWeight: 600, color: "#546E7A", textTransform: "uppercase", letterSpacing: 1, padding: "8px 18px 4px" }}>Menú</div>}

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
          {/* PAGE HEADER */}
          <div style={{ background: "#fff", borderBottom: "1px solid #90CAF9", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0D2B6B" }}>
                {active === "inicio" && "Hola, Jorge Eduardo"}
                {active === "qr" && "Mi código QR"}
                {active === "asistencia" && "Mi asistencia"}
                {active === "laptop" && "Registro de laptop"}
              </div>
              <div style={{ fontSize: 12, color: "#78909C", marginTop: 2 }}>ID: 001611258 · {today}</div>
            </div>
            <div style={{ background: "#E3F2FD", border: "1px solid #90CAF9", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#1565C0", fontWeight: 500 }}>Asistencia al día</div>
          </div>

          <div style={{ padding: 32 }}>
            {/* INICIO */}
            {active === "inicio" && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                  {[
                    { val: "0", label: "Faltas este mes", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { val: "100%", label: "% Asistencia", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { val: "0", label: "Tardanzas", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  ].map(s => (
                    <div key={s.label} style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon path={s.icon} size={22} color="#1565C0" />
                      </div>
                      <div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#0D2B6B" }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: "#78909C" }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
                  {NAV_ITEMS.filter(n => n.id !== "inicio").map(item => (
                    <div key={item.id} onClick={() => setActive(item.id)} style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 16, padding: "22px 20px", cursor: "pointer", transition: "all 0.18s", display: "flex", flexDirection: "column", gap: 10 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E88E5"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#90CAF9"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#E3F2FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon path={item.icon} size={20} color="#1565C0" />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0D2B6B" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* QR */}
            {active === "qr" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 14, color: "#78909C" }}>Muestra este código al vigilante para registrar tu ingreso</div>
                  <div style={{ background: "#fff", padding: 16, borderRadius: 12, border: "2px solid #E3F2FD" }}>
                    <QRCode value="001611258" />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#0D2B6B", letterSpacing: 2 }}>001611258</div>
                  <div style={{ fontSize: 12, color: "#78909C" }}>Jorge Eduardo · Estudiante SENATI</div>
                  <div style={{ background: "#E8F5E9", color: "#2E7D32", border: "1px solid #A5D6A7", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600 }}>● QR Activo</div>
                </div>
              </div>
            )}

            {/* ASISTENCIA */}
            {active === "asistencia" && (
              <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: "#E3F2FD", padding: "12px 20px", fontSize: 13, fontWeight: 600, color: "#1565C0", display: "flex", justifyContent: "space-between" }}>
                  <span>Registro de asistencia — Mayo 2025</span>
                  <span style={{ fontWeight: 400, color: "#546E7A" }}>{ASISTENCIA.length} registros</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC" }}>
                      {["Fecha", "Estado", "Hora de ingreso"].map(h => (
                        <th key={h} style={{ padding: "10px 20px", fontSize: 11, color: "#78909C", textAlign: "left", borderBottom: "1px solid #EEF2F7" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ASISTENCIA.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #F5F7FA" }}>
                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#0D2B6B" }}>{row.fecha}</td>
                        <td style={{ padding: "12px 20px" }}>
                          <span style={{ background: row.estado === "Presente" ? "#E8F5E9" : "#FFF8E1", color: row.estado === "Presente" ? "#2E7D32" : "#F57F17", border: `1px solid ${row.estado === "Presente" ? "#A5D6A7" : "#FFE082"}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                            {row.estado}
                          </span>
                        </td>
                        <td style={{ padding: "12px 20px", fontSize: 13, color: "#546E7A" }}>{row.hora}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* LAPTOP */}
            {active === "laptop" && (
              <div style={{ background: "#fff", border: "1px solid #90CAF9", borderRadius: 16, padding: 28, maxWidth: 480 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0D2B6B", marginBottom: 20 }}>Registrar equipo</div>
                {[
                  { label: "Marca", placeholder: "Ej. HP, Dell, Lenovo..." },
                  { label: "Modelo", placeholder: "Ej. HP Pavilion 15" },
                  { label: "N° Serie", placeholder: "Número de serie del equipo" },
                  { label: "Color", placeholder: "Ej. Negro, Plateado..." },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, color: "#546E7A", marginBottom: 6, display: "block", fontWeight: 500 }}>{field.label}</label>
                    <input placeholder={field.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #90CAF9", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#0D2B6B", outline: "none", background: "#FAFBFF" }} />
                  </div>
                ))}
                <button style={{ width: "100%", padding: "12px", background: "#1565C0", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>
                  Registrar equipo
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
