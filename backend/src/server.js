const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());
const app = require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
