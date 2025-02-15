const express = require('express');
const verificarToken = require('../middlewares/authMiddleware'); // Importar el middleware

const router = express.Router();

router.get('/datos-protegidos', verificarToken, (req, res) => {
  res.json({ message: 'Accediste a una ruta protegida', usuario: req.usuario });
});

module.exports = router;
