const express = require("express");
const router = express.Router();
const { getAsistencias, obtenerAsistenciaPorAlumno } = require("../controllers/asistencia.controller");

router.get("/", getAsistencias);
router.get("/alumno/:id", obtenerAsistenciaPorAlumno);

module.exports = router;
