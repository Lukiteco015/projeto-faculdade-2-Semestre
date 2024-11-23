const mongoose = require('mongoose');

const relatorioGanhosSchema = new mongoose.Schema({
    motoristaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    valorGanho: {
        type: Number,
        required: true
    },
    gastosId: {  // Referência para o relatório de gastos
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RelatorioGastos'
    }
});

module.exports = mongoose.model('RelatorioGanhos', relatorioGanhosSchema);
