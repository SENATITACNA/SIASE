const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const asistenciaRoutes = require("./routes/asistencia.routes");

app.use("/asistencia", asistenciaRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo");
});