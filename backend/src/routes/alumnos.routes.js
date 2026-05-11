const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnos.controller");

router.get("/:id", alumnosController.obtenerAlumnoFormateadoPorId);
router.get("/:id/datos", alumnosController.obtenerDatosAlumnoPorId);
router.get("/idsenati/:idsenati", alumnosController.obtenerAlumnoPorIdSenati);

module.exports = router;
