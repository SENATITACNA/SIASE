const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();

<<<<<<< HEAD
// Headers de seguridad HTTP
app.use(helmet());

// CORS restringido a orígenes específicos
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
=======
const allowedOrigins = [
  "http://80.241.217.53:4000",
  "http://localhost:4000",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, server-side)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS bloqueado para el origen: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
>>>>>>> a7265d73ab0e803fe6fbf0c2757f999b9a19b49b

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
  console.error("Error no controlado:", err.message);
  res.status(500).json({ error: "Error en el servidor" });
});

module.exports = app;