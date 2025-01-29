const express = require('express');
const router = express.Router();
const Multa = require('../models/Multas'); // Modelo de multas
const Usuario = require('../models/Usuarios'); // Modelo de usuarios
const Notificacion = require('../models/Notificaciones'); // Modelo de notificaciones

// Insertar multas y crear notificaciones
router.post('/insertar_multas', async (req, res) => {
    try {
        const { fecha, estadoGrupo, descripcionInfraccion, metodoPago, monto, nombreInfractor, departamento } = req.body;

        if (!fecha || !estadoGrupo || !descripcionInfraccion || !metodoPago || !monto || !nombreInfractor || !departamento) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear nueva multa
        const nuevaMulta = new Multa({ fecha, estadoGrupo, descripcionInfraccion, metodoPago, monto, nombreInfractor, departamento });
        await nuevaMulta.save();

        // Crear notificación asociada al departamento con los mismos campos
        const nuevaNotificacion = new Notificacion({
            fecha, // Agregar el mismo campo
            estadoGrupo, // Agregar el mismo campo
            descripcionInfraccion, // Agregar el mismo campo
            metodoPago, // Agregar el mismo campo
            monto, // Agregar el mismo campo
            nombreInfractor, // Agregar el mismo campo
            departamento, // Agregar el mismo campo
            mensaje: `Se ha registrado una multa para ${nombreInfractor} con un monto de ${monto}.`, // Mensaje de la notificación
            multaId: nuevaMulta._id, // Relacionar con la multa
        });
        await nuevaNotificacion.save();

        res.status(201).json({
            message: 'Multa y notificación creadas exitosamente',
            multa: nuevaMulta,
            notificacion: nuevaNotificacion,
        });
    } catch (error) {
        console.error('Error al insertar multa y notificación:', error);
        res.status(500).json({ message: 'Error al registrar la multa y crear la notificación' });
    }
});

// Obtener multas
router.get('/obtener_multas', async (req, res) => {
    try {
        const multas = await Multa.find();

        const formattedMultas = multas.map((multa) => ({
            fecha: multa.fecha,
            estadoGrupo: multa.estadoGrupo,
            descripcionInfraccion: multa.descripcionInfraccion,
            metodoPago: multa.metodoPago,
            monto: multa.monto,
            nombreInfractor: multa.nombreInfractor,
            notificacion:multa.notificacion,
        }));

        res.json(formattedMultas);
    } catch (error) {
        console.error('Error al obtener las multas:', error);
        res.status(500).json({ error: 'Error al obtener las multas' });
    }
});

// Obtener notificaciones por usuario
router.get('/notificaciones/:departamento', async (req, res) => {
    try {
        const { departamento } = req.params;

        // Buscar notificaciones asociadas al departamento
        const notificaciones = await Notificacion.find({ departamento });

        res.status(200).json({ notificaciones });
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
});


router.post('/iniciar_sesion', async (req, res) => {
  try {
      const { numero } = req.body;

      if (!numero) {
          return res.status(400).json({ message: 'El número de teléfono es obligatorio' });
      }

      // Buscar al usuario por su número
      const usuario = await Usuario.findOne({ numero });

      if (!usuario) {
          return res.status(404).json({ message: 'El número de teléfono no está registrado' });
      }

      // Respuesta exitosa incluyendo el rol del usuario
      res.status(200).json({
          message: 'Inicio de sesión exitoso',
          usuario: {
              id: usuario._id,
              numero: usuario.numero,
              rol: usuario.rol,
              departamento: usuario.departamento // Incluye el rol en la respuesta
          },
      });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
