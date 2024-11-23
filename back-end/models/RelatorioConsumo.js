const mongoose = require('mongoose');

const relatorioConsumoSchema = new mongoose.Schema({
    motoristaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    quilometragem: {
        type: Number,
        required: true
    },
    consumoCombustivel: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RelatorioConsumo', relatorioConsumoSchema);
