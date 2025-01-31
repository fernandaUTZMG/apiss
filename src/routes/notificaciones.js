const express = require('express');
const router = express.Router();
const Notificaciones = require('../models/Notificaciones'); // <-- Aquí se corrige la importación

router.get('/notificaciones/:departamento', async (req, res) => {
    try {
        let { departamento } = req.params;

        console.log("📌 Departamento recibido:", departamento);
        console.log("📌 Tipo de departamento:", typeof departamento);

        // Convertimos departamento a string por si MongoDB lo guarda como número
        departamento = String(departamento);

        // Buscar notificaciones que coincidan con el departamento
        const notificaciones = await Notificaciones.find({ departamento });

        console.log("📌 Notificaciones encontradas:", notificaciones);

        // Mapear las notificaciones para incluir el campo "leido" si no existe
        const notificacionesFormateadas = notificaciones.map(notif => ({
            ...notif._doc,
            leido: notif.leido || false, // Si no existe el campo "leido", se establece como false
        }));

        res.json(notificacionesFormateadas);
    } catch (error) {
        console.error("❌ Error en la API de notificaciones:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
