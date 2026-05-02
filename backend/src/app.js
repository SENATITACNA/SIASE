const express = require('express');
const app = express();

app.use(express.json());

const vigilanteRoutes = require('./routes/vigilante.routes');

app.use("/api", vigilanteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});