const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    preferenciasViagem: {
        type: [String],
        default: []
    },
    motorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',
        required: true
      }
})

module.exports = mongoose.model('Cliente', clienteSchema)