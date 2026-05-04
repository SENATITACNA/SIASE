const express = require("express");
const router = express.Router();
const datosAlumnosController = require("../controllers/datos_alumnos.controller");

router.get("/datos_alumnos/:id", datosAlumnosController.obtenerAlumnoPorId);

module.exports = router;