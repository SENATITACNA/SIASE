const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");

router.get("/vigilantes/:vigilante_id", vigilanteController.getVigilantePorId);

module.exports = router;