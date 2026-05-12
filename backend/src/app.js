const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: true, // Permite cualquier origen con credenciales
    credentials: true, // Permite envío de cookies
  })
);
app.use(express.json());
app.use(cookieParser());

const loginRoutes = require("./routes/login.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");
const registroDispositivoRoutes = require("./routes/registro_dispositivo.routes");
const vigilanteRoutes = require("./routes/vigilante.routes");
const tokensVigilanteRoutes = require("./routes/tokens_vigilante.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");

app.use("/login", loginRoutes);

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