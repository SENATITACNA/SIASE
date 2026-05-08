const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");

router.get(
  "/alumnos",
  vigilanteController.getAlumnos.bind(vigilanteController),
);

router.put(
  "/registro/:id/estado",
  vigilanteController.putEstadoRegistro.bind(vigilanteController),
);

router.get(
  "/:vigilante_id",
  vigilanteController.getVigilantePorId.bind(vigilanteController),
);

module.exports = router;
