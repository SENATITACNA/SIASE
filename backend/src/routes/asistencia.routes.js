const express = require("express");
const router = express.Router();

const { getAsistencias, registrarAsistencia } = require("../controllers/asistencia.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.get("/", getAsistencias);
router.post("/registrar", registrarAsistencia);

module.exports = router;