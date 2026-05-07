const express = require("express");
const app = express();
const alumnosRoutes = require("./routes/alumnosRoute");
app.use(express.json());
app.use("/api", alumnosRoutes);
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});