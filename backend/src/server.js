<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const db = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());
=======
const app = require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://80.241.217.53:${PORT}`);
});
>>>>>>> a7265d73ab0e803fe6fbf0c2757f999b9a19b49b
