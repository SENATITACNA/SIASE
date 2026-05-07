const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const asistenciaRoutes = require("./routes/asistenciaRoutes");
const datosAlumnosRoutes = require("./routes/datos_alumnosRoutes");

app.use("/asistencia", asistenciaRoutes);
app.use("/api", datosAlumnosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});