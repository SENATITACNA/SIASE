const express = require("express");
const router = express.Router();
const { getAsistencias, getAsistenciasPorAlumno } = require("../controllers/asistencia.controller");

router.get("/", getAsistencias);
router.get("/alumno/:id", getAsistenciasPorAlumno);

module.exports = router;
