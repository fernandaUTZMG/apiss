const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuarios');
const { v4: uuidv4 } = require('uuid');
//const verifyToken = require("./src/middlewares/authMiddleware"); 


const jwt = require('jsonwebtoken'); // Asegúrate de tener instalado jsonwebtoken
const secretKey = 'token';

router.post('/', async (req, res) => {
  console.log("1");
  try {
    const { numero} = req.body;

    if (!numero) {
      return res.status(400).json({ message: 'El número de teléfono es obligatorio' });
    }

    console.log("2");
    // Buscar al usuario por su número
    const usuario = await Usuario.findOne({ numero });

    if (!usuario) {
      return res.status(404).json({ message: 'El número de teléfono no está registrado' });
    }

    console.log("3");
    // Generar el token después de encontrar al usuario
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario,
        numero: usuario.numero,
        rol: usuario.rol,
        tipo_departamento: usuario.tipo_departamento,
        id_departamento: usuario.id_departamento },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("4");
    // Respuesta exitosa incluyendo los datos del usuario y el token
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario
    });
    console.log(token);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});




router.post('/registro', async (req, res) => {
    /* const token=req.get("Authorization");
    if(verifyToken(token)){

    } */
    try {
        const { numero, rol, tipo_departamento, id_departamento } = req.body;

    // Validar que todos los campos estén presentes
    if (!numero || !rol || !tipo_departamento || !id_departamento) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el número ya está registrado
    const usuarioExistente = await Usuario.findOne({ numero });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El número de teléfono ya está registrado' });
    }

    // Crear un nuevo usuario con un id único
    const nuevoUsuario = new Usuario({
      id_usuario: uuidv4(), // Asignar un UUID único
      numero,
      rol,
      tipo_departamento,
      id_departamento,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

module.exports = router;

