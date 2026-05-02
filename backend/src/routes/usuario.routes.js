const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get("/instructor", usuarioController.getInstructor);
router.get("/dispositivo_x_alumno", usuarioController.getDispositivoAlumno);

module.exports = router;