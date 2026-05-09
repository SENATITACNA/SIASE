const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM asistencia WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ msg: "No encontrado" });

    res.json(result[0]);
  });
});

module.exports = router;


const { getAsistencias } = require("../controllers/asistencia.controller");

router.get("/", getAsistencias);

module.exports = router;
