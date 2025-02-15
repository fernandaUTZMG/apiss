require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importar CORS
const connectDB = require("./Db");
const multas = require("./src/routes/multas");
const usuarios = require("./src/routes/usuarios");
const notis = require("./src/routes/notificaciones");
const rutasProtegidas = require("./src/routes/protegidas");
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Rutas
app.use("/api/multas", multas);
app.use("/api/usuarios", usuarios);
app.use("/api/notificaciones", notis);
app.use("/api", rutasProtegidas)



// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));