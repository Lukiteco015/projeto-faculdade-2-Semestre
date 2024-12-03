const Veiculo = require('../models/Veiculo');
const jwt = require('jsonwebtoken');
const Motorista = require('../models/Motorista');
require('dotenv').config({ path: '.env'})
const JWT_SECRET = process.env.SECRET_KEY;

// Função para cadastrar um novo veículo
const cadastrarVeiculo = async (req, res) => {
  const { marca, modelo, ano, placa } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const motoristaId = decoded.id; // Id do motorista

    // Verificar se o motorista existe
    const motorista = await Motorista.findById(motoristaId);
    if (!motorista) {
      return res.status(404).json({ mensagem: 'Motorista não encontrado.' });
    }

    // Criar o novo veículo
    const novoVeiculo = new Veiculo({
      marca,
      modelo,
      ano,
      placa,
      idmotorista: motoristaId,
    });

    // Salvar no banco de dados
    await novoVeiculo.save();
    
    // Responder com sucesso
    return res.status(201).json({
      mensagem: 'Veículo cadastrado com sucesso!',
      veiculo: novoVeiculo,
    });
  } catch (error) {
    console.error('Erro ao cadastrar veículo:', error);
    return res.status(500).json({ mensagem: 'Erro ao cadastrar veículo.' });
  }
};

module.exports = {
  cadastrarVeiculo,
};
