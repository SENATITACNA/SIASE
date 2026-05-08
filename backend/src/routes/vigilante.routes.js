const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");

// Definimos la ruta GET para /api/vigilantes
router.get("/", vigilanteController.obtenerVigilantes);

module.exports = router;