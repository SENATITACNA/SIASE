const express = require("express");

const router = express.Router();

const registroDispositivoController =
    require("../controllers/registro_dispositivo.controller");

/* GET - Obtener registros */
router.get(
    "/",
    registroDispositivoController.obtenerRegistros.bind(
        registroDispositivoController
    )
);

/* POST - Registrar dispositivo */
router.post(
    "/",
    registroDispositivoController.registrarDispositivo.bind(
        registroDispositivoController
    )
);

module.exports = router;