const express = require("express");
const router = express.Router();

const { getAsistencias } = require("../controllers/asistenciaController");

router.get("/", getAsistencias);

module.exports = router;