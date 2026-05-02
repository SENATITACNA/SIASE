const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");

router.get("/vigilantes", vigilanteController.getVigilantes);

module.exports = router;