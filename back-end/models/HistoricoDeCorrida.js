const mongoose = require('mongoose');

const HistoricoDeCorridaSchema = new mongoose.Schema({
    motoristaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',
        required: true
    },
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    corridaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corrida',
        required: true
    },
});

module.exports = mongoose.model('HistoricoDeCorrida', HistoricoDeCorridaSchema);