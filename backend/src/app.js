const express = require("express");
const cors = require("cors");
const app = express();

const registroRoutes = require("./routes/registro_dispositivo.routes");
const vigilanteRoutes = require("./routes/vigilante.routes");
const datosAlumnosRoutes = require("./routes/datos_alumnos.routes");
const errorMiddleware = require("./middlewares/error.middleware");


app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", registroRoutes);
app.use("/api", vigilanteRoutes);
app.use("/api", datosAlumnosRoutes);

app.use(errorMiddleware);

module.exports = app;