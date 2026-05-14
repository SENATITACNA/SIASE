const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const registroDispositivoController = require("../controllers/registro_dispositivo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Todas las rutas de registro de dispositivos requieren autenticación
router.use(verifyToken);
=======

const ctrl = require("../controllers/registro_dispositivo.controller");
>>>>>>> a7265d73ab0e803fe6fbf0c2757f999b9a19b49b

router.get("/", ctrl.obtenerRegistros.bind(ctrl));
router.post("/", ctrl.registrarDispositivo.bind(ctrl));

// Dispositivos y solicitudes por alumno
router.get("/alumno/:alumno_id/dispositivos", ctrl.obtenerDispositivosPorAlumno.bind(ctrl));
router.get("/alumno/:alumno_id/solicitudes", ctrl.obtenerSolicitudesPorAlumno.bind(ctrl));
router.post("/solicitud-ingreso", ctrl.crearSolicitudIngreso.bind(ctrl));
router.put("/:id/marcar-entrada", ctrl.marcarEntrada.bind(ctrl));
router.put("/:id/marcar-salida", ctrl.marcarSalida.bind(ctrl));

module.exports = router;
