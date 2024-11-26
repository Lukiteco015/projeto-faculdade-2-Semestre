const moment = require('moment-timezone');
const { calculateDistanceBetweenAddresses } = require('../config/geocoding');
const Corrida = require('../models/Corrida');
const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');

exports.criarCorrida = async (req, res) => {
  try {
    const { enderecoOrigem, enderecoDestino, tarifaPorKm, nomeCliente } = req.body;

    if (!enderecoOrigem || !enderecoDestino || !tarifaPorKm) {
      return res.status(400).json({ error: 'Por favor, forneça todos os campos obrigatórios.' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido ou inválido' });
    }

    let motoristaId;
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      motoristaId = decoded.id;
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    // Buscar todos os clientes associados ao motorista
    const clientes = await Cliente.find({ motorista: motoristaId });  // Cliente tem a referência 'motorista'

    if (clientes.length === 0) {
      return res.status(404).json({ error: 'Nenhum cliente encontrado para esse motorista.' });
    }

    // Agora, se nomeCliente for fornecido, podemos buscar esse cliente específico
    let clienteId = null;
    if (nomeCliente) {
      const cliente = await Cliente.findOne({
        nome: { $regex: nomeCliente, $options: 'i' },  // Busca aproximada, case-insensitive
        motorista: motoristaId,  // Garante que o cliente é do motorista atual
      });

      if (cliente) {
        clienteId = cliente._id;
      } else {
        return res.status(404).json({ error: 'Cliente não encontrado com esse nome para esse motorista.' });
      }
    }

    const datahora = moment.tz('America/Sao_Paulo').toDate();

    const distancia = await calculateDistanceBetweenAddresses(enderecoOrigem, enderecoDestino);

    if (distancia <= 0) {
      return res.status(400).json({ error: 'Distância inválida entre os endereços.' });
    }

    const precoTotal = distancia * tarifaPorKm;

    const novaCorrida = new Corrida({
      enderecoOrigem,
      enderecoDestino,
      distancia,
      status: 'Em Andamento',
      datahora,
      tarifaPorKm,
      precoTotal,
      motorista: motoristaId,
      cliente: clienteId
    });

    await novaCorrida.save();

    return res.status(201).json({
      message: `Corrida cadastrada com sucesso. Distância calculada: ${distancia} km. Preço total: R$${precoTotal.toFixed(2)}.`,
      corrida: novaCorrida,
      clientes: clientes // Retornando a lista de clientes associados ao motorista
    });
  } catch (error) {
    console.error('Erro ao cadastrar corrida:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar corrida' });
  }
};

