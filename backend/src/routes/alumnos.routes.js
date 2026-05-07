const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnos.controller");

router.get("/:id", alumnosController.obtenerAlumnoPorId);

module.exports = router;