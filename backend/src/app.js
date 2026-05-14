const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();


app.use(cors({
  // AQUI ESTÁ LA MAGIA: Agregamos el localhost:4000
  origin: ["http://localhost:4000", "http://127.0.0.1:4000", "http://localhost:5173"], 
  credentials: true
}));
// 2. Middlewares (sin duplicar express.json)
app.use(cookieParser());
app.use(express.json());

const loginRoutes = require("./routes/login.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");
const registroDispositivoRoutes = require("./routes/registro_dispositivo.routes");
const vigilanteRoutes = require("./routes/vigilante.routes");
const tokensVigilanteRoutes = require("./routes/tokens_vigilante.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");

// 3. Rutas
app.use("/login", loginRoutes); // Nota: Esta ruta no tiene /api/
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/registro_dispositivo", registroDispositivoRoutes);
app.use("/api/vigilantes", vigilanteRoutes);
app.use("/api/tokens_vigilante", tokensVigilanteRoutes);
app.use("/api/asistencia", asistenciaRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Error en el servidor" });
});

module.exports = app;