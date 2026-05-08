const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");

router.get("/", (req, res) => vigilanteController.obtenerVigilantes(req, res));

router.get("/alumnos", (req, res) => vigilanteController.getAlumnos(req, res));

router.put("/registro/:id/estado", (req, res) => vigilanteController.putEstadoRegistro(req, res));

router.get("/:vigilante_id", (req, res) => vigilanteController.getVigilantePorId(req, res));

module.exports = router;