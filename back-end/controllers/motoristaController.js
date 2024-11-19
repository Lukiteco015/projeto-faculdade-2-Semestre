const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Motorista = require('../models/Motorista');
const Veiculo = require('../models/Veiculo');

const JWT_SECRET = 'Luketa';

exports.criarMotoristaEVeiculo = async (req, res) => {
  try {
    const { nome, cpf, foto, senha, email, veiculo } = req.body;
    if (!nome || !cpf || !foto || !senha || !email || !veiculo || !veiculo.marca || !veiculo.modelo || !veiculo.ano || !veiculo.placa)
      return res.status(400).json({ mensagem: 'Dados insuficientes para cadastrar motorista e veículo.' });

    const veiculoCriado = new Veiculo(veiculo);
    await veiculoCriado.save();

    const motoristaCriado = new Motorista({ nome, cpf, foto, senha, email, idveiculo: veiculoCriado._id });
    await motoristaCriado.save();

    res.status(201).json({ mensagem: 'Motorista e veículo criados com sucesso!', motorista: motoristaCriado, veiculo: veiculoCriado });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar motorista e veículo.', erro: err.message });
  }
};
