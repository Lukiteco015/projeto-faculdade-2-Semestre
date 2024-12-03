const mongoose = require('mongoose')

const pagamentoSchema = new mongoose.Schema({
    idcorrida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corrida'
    },
    metodopagamento: {
        type: String,
        enum: ['Cartão de débito', 'Pix', 'Dinheiro'],
        required: true
    },
    valorpago: {
        type: Number,
        required: true
    },
    statuspagamento: {
        type: String,
        enum: ['Pago', 'Pendente'],
        required: true
    }
})

module.exports = mongoose.model('Pagamento', pagamentoSchema)