const express = require("express");
const router = express.Router();
const registroController = require("../controllers/registro_dispositivo.controller");

router.get("/registro_dispositivos", registroController.obtenerRegistros);

module.exports = router;