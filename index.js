  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const connectDB = require("./Db");
  const multas = require("./src/routes/multas");
  const usuarios = require("./src/routes/usuarios");
  const notis = require("./src/routes/notificaciones");
  const rutasProtegidas = require("./src/routes/protegidas");
  const newcontra = require("./src/routes/newcontra");
  //const verifyToken = require("./src/middlewares/authMiddleware");   

  const app = express();

  // Conectar a MongoDB
  connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use("/api", multas);
  app.use("/api/iniciarS", usuarios);
  app.use("/api", usuarios);
  //app.use("/api",verifyToken, notis);
  app.use("/api/protegidas", rutasProtegidas);
  app.use("/api", newcontra);


  // Iniciar el servidor
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
