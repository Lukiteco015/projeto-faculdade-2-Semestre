const mongoose = require('mongoose');

const relatorioGastosSchema = new mongoose.Schema({
    motoristaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
   /* corridaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corrida',
        required: true
    },*/
    valorDespesa: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RelatorioGastos', relatorioGastosSchema);
