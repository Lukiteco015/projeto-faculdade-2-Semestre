const moment = require('moment-timezone');
const { calculateDistanceBetweenAddresses } = require('../config/geocoding');  // Atualize para usar a função de endereços
const Corrida = require('../models/Corrida');

exports.criarCorrida = async (req, res) => {
  try {
    const { enderecoOrigem, enderecoDestino, tarifaBase, tarifaPorKm } = req.body;

    // Validação dos dados
    if (!enderecoOrigem || !enderecoDestino || !tarifaBase || !tarifaPorKm) {
      return res.status(400).json({ error: 'Por favor, forneça todos os campos obrigatórios.' });
    }

    // Obter a data e hora atual do fuso horário de São Paulo
    const datahora = moment.tz('America/Sao_Paulo').toDate();  // Hora local de São Paulo

    // Calcular a distância entre os endereços
    const distancia = await calculateDistanceBetweenAddresses(enderecoOrigem, enderecoDestino);

    if (distancia <= 0) {
      return res.status(400).json({ error: 'Distância inválida entre os endereços.' });
    }

    // Calcular o preço total da corrida
    const precoTotal = (distancia * tarifaPorKm) + tarifaBase;

    // Criando a nova corrida
    const novaCorrida = new Corrida({
      enderecoOrigem,  // Usando os endereços completos
      enderecoDestino,
      distancia,
      status: 'Em Andamento',
      datahora,  // Usando a data atual do fuso horário de São Paulo
      tarifaPorKm,
      tarifaBase,
      precoTotal
    });

    await novaCorrida.save();

    return res.status(201).json({
      message: `Corrida cadastrada com sucesso. Distância calculada: ${distancia} km. Preço total: R$${precoTotal.toFixed(2)}.`,
      corrida: novaCorrida
    });
  } catch (error) {
    console.error('Erro ao cadastrar corrida:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar corrida' });
  }
};
