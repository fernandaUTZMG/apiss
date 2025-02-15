const jwt = require('jsonwebtoken'); // Asegúrate de tener instalado jsonwebtoken

// Middleware para verificar el token JWT
module.exports = (req, res, next) => {
    // Obtén el token del encabezado 'Authorization' (generalmente como Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extrae el token si está presente

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // Verifica el token con la clave secreta
        const decoded = jwt.verify(token, 'token'); // 'token' es tu clave secreta
        // Si la verificación es exitosa, agregamos los datos decodificados al objeto req
        req.usuario = decoded;
        next(); // Llama al siguiente middleware o controlador
    } catch (error) {
        return res.status(400).json({ message: 'Token no válido o expirado.' });
    }
};

