const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    id_usuario: {
        type: String,
        required: true,
        unique: true,
    },
    numero: {
        type: String,
        required: true,
        unique: true,
    },
    rol: {
        type: String,
        required: true,
    },
    departamento: {
        type: String,
        required: true,
    },
    id_departamento: {
        type: String,
        required: true,
    },
}, { collection: 'usuarios' }); // Asegúrate de que el nombre coincida con tu colección en MongoDB

module.exports = mongoose.model('Usuario', UsuarioSchema);
