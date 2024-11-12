const mongoose = require('mongoose');

/*const agendamentoSchema = new mongoose.Schema({
    idcliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',  // Relacionamento com o Cliente
        required: true
    },
    idmotorista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motorista',  // Relacionamento com o Motorista
        required: true
    },
    datahora: {
        type: Date,
        required: true  // Data e hora da corrida agendada
    },
    dataHoraMarcada: {
        type: Date,  // Data e hora que foi marcada com o cliente
        required: true
    },
    status: {
        type: String,
        enum: ['Agendada', 'Cancelada', 'Concluída'],
        default: 'Agendada'
    }
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);*/
