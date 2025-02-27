const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importar uuid para generar id único

const UsuarioSchema = new mongoose.Schema({
    id_usuario: { 
        type: String, 
        unique: true, 
        default: uuidv4 // Genera un UUID automáticamente si no se proporciona
    }, 
    numero: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
    departamento: {
        type: String,
        required: false,
    },
    id_departamento: {
        type: String,
        required: true,
    },
    token: { 
        type: String, 
        default: null 
    }
}, { collection: 'usuarios' });

module.exports = mongoose.model('usuarios', UsuarioSchema);
