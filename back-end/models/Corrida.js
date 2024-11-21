const mongoose = require('mongoose');

const corridaSchema = new mongoose.Schema({
  /*idcliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },*/
  motorista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Motorista',
    required: true
  },/*
  idagendamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agendamento',
    required: true
  },*/
  enderecoOrigem: {
    type: String,
    required: true
  },
  enderecoDestino: {
    type:String,
    required: true
  },
  distancia: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pendente', 'Concluida', 'Cancelada', 'Em Andamento'],
    required: true
  },
  precoTotal: {
    type: Number,
    required: true
  },
  datahora: {
    type: Date,
    default: Date.now,
    required: true
  },
  tarifaPorKm: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Corrida', corridaSchema);
