const express = require('express');
const router = express.Router();
const guardiaController = require('../controllers/guardia.controller');

router.get('/alumnos', guardiaController.getAlumnos.bind(guardiaController));

router.put('/registro/:id/estado', guardiaController.putEstadoRegistro.bind(guardiaController));

module.exports = router;