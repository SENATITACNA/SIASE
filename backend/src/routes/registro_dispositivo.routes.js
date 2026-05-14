const express = require("express");
const router = express.Router();
const registroDispositivoController = require("../controllers/registro_dispositivo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Todas las rutas de registro de dispositivos requieren autenticación
router.use(verifyToken);

router.get(
  "/",
  registroDispositivoController.obtenerRegistros.bind(
    registroDispositivoController,
  ),
);

router.post(
  "/",
  registroDispositivoController.registrarDispositivo.bind(
    registroDispositivoController,
  ),
);

module.exports = router;
