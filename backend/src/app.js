const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const datosAlumnosRoutes = require("./routes/datos_alumnos.routes");
const vigilanteRoutes = require("./routes/vigilante.routes");
const registroRoutes = require("./routes/registro_dispositivo.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");
const qrRoutes = require("./routes/qr.routes");
const errorMiddleware = require("./middlewares/error.middleware");

app.use("/api", datosAlumnosRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/vigilante", vigilanteRoutes);
app.use("/api/registro_dispositivos", registroRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructores", instructorRoutes);
app.use("/api/asistencias", asistenciaRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});

module.exports = app;