const express = require('express');
const router = express.Router();

const vigilanteController = require('../controllers/vigilante.controller');

router.get("/instructor", vigilanteController.getInstructor);
router.get("/dispositivo_x_alumno", vigilanteController.getDispositivoAlumno);

module.exports = router;