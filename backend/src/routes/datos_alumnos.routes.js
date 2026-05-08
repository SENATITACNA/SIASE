const express = require("express");
const router = express.Router();

const datosAlumnosController = require("../controllers/datos_alumnos.controller");

router.get("/alumnos/:id", datosAlumnosController.obtenerAlumnoPorId);

module.exports = router;