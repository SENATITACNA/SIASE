// backend/src/routes/ListaVigilante_alumnos.js
import express from "express";
import mysql from "mysql2";
const router = express.Router();
const db = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE",
  port: 3306,
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM datos_alumnos";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error en consulta:", err);
      return res.status(500).json({ error: "Error en servidor" });
    }
    res.json(results);
  });
});
export default router;
