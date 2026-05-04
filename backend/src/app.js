const express = require("express");
const app = express();

const datosAlumnosRoutes = require("./routes/datos_alumnosRoutes");

app.use(express.json());

// base: /api
app.use("/api", datosAlumnosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});