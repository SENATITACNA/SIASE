const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const asistenciaRoutes = require("./routes/asistenciaRoutes");

app.use("/asistencia", asistenciaRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});