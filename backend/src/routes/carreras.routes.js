const express = require("express");
const router = express.Router();
const { getCarreras } = require("../controllers/carreras.controller");

router.get("/", getCarreras);

module.exports = router;
