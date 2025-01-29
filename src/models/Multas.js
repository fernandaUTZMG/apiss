
const mongoose = require('mongoose');

const MultaSchema = new mongoose.Schema({
  fecha: { type: String, required: false },
  estadoGrupo: { type: String, required: false },
  descripcionInfraccion: { type: String, required: false },
  metodoPago: { type: String, required: false },
  monto: { type: String, required: false },
  nombreInfractor: { type: String, required: false },
  departamento: { type: String, required: false },

}, {
    timestamps: true, // Opcional: agrega ⁠ createdAt ⁠ y ⁠ updatedAt ⁠ automáticamente
});

module.exports = mongoose.model('Multas', MultaSchema);