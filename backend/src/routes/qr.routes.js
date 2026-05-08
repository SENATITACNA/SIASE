const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qr.controller');

router.post('/inicializar', qrController.inicializarTokens);
router.get('/tokens/:guardia_id', qrController.getTokensActivos);
router.post('/rotar', qrController.rotarToken);
router.post('/escanear', qrController.escanearQR);

// AÑADE ESTA LÍNEA NUEVA:
router.get('/ultimo-escaneo/:guardia_id', qrController.obtenerUltimoEscaneo);

module.exports = router;