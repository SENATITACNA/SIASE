const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const vigilanteRoutes = require("./routes/vigilante.routes");
const registroRoutes = require("./routes/registro_dispositivo.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");

app.use("/api/vigilante", vigilanteRoutes);
app.use("/api/registro_dispositivos", registroRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructores", instructorRoutes);

const asistenciaRoutes = require("./routes/asistencia.routes");
app.use("/api/asistencias", asistenciaRoutes);

const errorMiddleware = require("./middlewares/error.middleware");

app.use(errorMiddleware);

module.exports = app;
