const mongoose = require('mongoose')

const veiculoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    placa: {
        type: String,
        required: true,
        unique: true
    },
    idmotorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista'
    }
})

module.exports = mongoose.model('Veiculo', veiculoSchema)