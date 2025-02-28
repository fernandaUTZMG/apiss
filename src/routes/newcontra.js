const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuarios');
const { v4: uuidv4 } = require('uuid');
//const verifyToken = require("./src/middlewares/authMiddleware"); 


const jwt = require('jsonwebtoken');
const secretKey = 'token';
const bcrypt = require('bcrypt');

router.post('/newcontra', async (req, res) => {
    console.log("Ruta de cambio de contraseña alcanzada");
    try {
        const { numero, newPassword } = req.body;

        // Validar que los campos estén presentes
        if (!numero || !newPassword) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ numero });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la nueva contraseña con la actual
        const passwordMatch = await bcrypt.compare(newPassword, usuario.pass);
        if (passwordMatch) {
            return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la anterior' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario y eliminar el token
        usuario.pass = hashedPassword;
        usuario.token = null; // O eliminar con delete usuario.token;
        await usuario.save();

        res.status(200).json({ message: 'Contraseña cambiada exitosamente y token eliminado' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
});



// Nueva ruta para verificar el token
router.get('/verificar/:numero', async (req, res) => {
    try {
        const { numero } = req.params;
        const usuario = await Usuario.findOne({ numero });

        if (!usuario || !usuario.token) {
            return res.status(401).json({ message: 'Token no encontrado, redirigir al login' });
        }

        res.status(200).json({ message: 'Token válido' });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


module.exports = router;

