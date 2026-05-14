const express = require("express");
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8df41127beb4920abbc5ccfbfd3daf91273fdf6a
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


<<<<<<< HEAD
=======
=======
>>>>>>> 8df41127beb4920abbc5ccfbfd3daf91273fdf6a
const { getAsistencias } = require("../controllers/asistencia.controller");

router.get("/", getAsistencias);

module.exports = router;
<<<<<<< HEAD
>>>>>>> a7265d73ab0e803fe6fbf0c2757f999b9a19b49b
=======
>>>>>>> 8df41127beb4920abbc5ccfbfd3daf91273fdf6a
