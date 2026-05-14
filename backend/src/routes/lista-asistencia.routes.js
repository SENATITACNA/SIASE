const express = require("express");
const router = express.Router();
const controller = require("../controllers/lista-asistencia.controller");
router.get("/:idsenati", controller.getListaAsistencia);
module.exports = router;