const express = require("express");
const router = express.Router();

const alumnosController = require("../controllers/datos_alumnos.controller");

router.get("/alumnos/:id", alumnosController.obtenerAlumnoPorId);

module.exports = router;