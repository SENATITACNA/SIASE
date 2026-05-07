const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnosController");
router.get("/alumnos/:id", alumnosController.obtenerAlumnoPorId);
module.exports = router;
