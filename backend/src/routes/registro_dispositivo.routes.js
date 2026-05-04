const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro_dispositivo.controller');

router.get('/', registroController.obtenerRegistros.bind(registroController));

module.exports = router;
