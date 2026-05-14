const express = require("express");

const router = express.Router();

const ctrl = require("../controllers/registro_dispositivo.controller");

router.get("/", ctrl.obtenerRegistros.bind(ctrl));
router.post("/", ctrl.registrarDispositivo.bind(ctrl));

// Dispositivos y solicitudes por alumno
router.get("/alumno/:alumno_id/dispositivos", ctrl.obtenerDispositivosPorAlumno.bind(ctrl));
router.get("/alumno/:alumno_id/solicitudes", ctrl.obtenerSolicitudesPorAlumno.bind(ctrl));
router.post("/solicitud-ingreso", ctrl.crearSolicitudIngreso.bind(ctrl));

module.exports = router;
