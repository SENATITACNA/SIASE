const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE", 
});
const app = express();
app.use(cors());
app.use(express.json());
app.get("/listaVigilante_alumnos", (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.nombres, 
      a.apellidos,
      a.idsenati,
      a.semestre,
      a.carrera_id,
      c.nombre AS carrera_nombre,
      a.estado,
      a.fecha_creacion
    FROM datos_alumnos a
    LEFT JOIN carreras c ON a.carrera_id = c.id
    WHERE a.estado = 1
  `;
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Error al obtener alumnos" });
    }
    res.json(results);
  });
});
app.get("/carreras", (req, res) => {
  pool.query("SELECT id, nombre FROM carreras", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener carreras" });
    res.json(results);
  });
});
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});