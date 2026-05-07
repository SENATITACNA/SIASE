const express = require('express');
const router = express.Router();
const datosAlumnosController = require('../controllers/datos_alumnos.controller');

router.get('/:id', datosAlumnosController.obtenerAlumnoPorId.bind(datosAlumnosController));

module.exports = router;