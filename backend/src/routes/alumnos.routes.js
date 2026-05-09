const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnos.controller");
const vigilanteController = require("../controllers/vigilante.controller");

router.get("/lista",vigilanteController.getAlumnos.bind(vigilanteController),);
router.get("/:id", alumnosController.obtenerAlumnoFormateadoPorId);
router.get("/:id/datos", alumnosController.obtenerDatosAlumnoPorId);

module.exports = router;
