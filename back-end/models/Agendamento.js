const mongoose = require('mongoose')

const agendamentoSchema = new mongoose.Schema({
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
    dias: {
        type: [String], // Exemplo: ['Segunda', 'Terça', 'Quarta']
        required: true
    },
    horario: {
        type: Date,
        required: true
    },
    localOrigem: {
        type: String,
        required: true
    },
    localDestino: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);

