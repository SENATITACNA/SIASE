// backend/server.js
import express from "express";
import cors from "cors";
import ListaVigilante_alumnos from "./src/routes/ListaVigilante_alumnos.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/listaVigilante_alumnos", ListaVigilante_alumnos);
app.listen(3000, () => {
  console.log("Servidor backend corriendo en http://localhost:3000");
});
