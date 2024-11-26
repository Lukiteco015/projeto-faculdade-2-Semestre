const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');

exports.criarCliente = async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;

    if (!nome || !cpf || !telefone)
      return res.status(400).json({ mensagem: 'Dados insuficientes para cadastrar cliente.' });

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ mensagem: 'Token de autenticação não fornecido.' });
    }

    let motoristaId;
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      motoristaId = decoded.id;
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }

    const clienteExistente = await Cliente.findOne({ cpf });
    if (clienteExistente) {
      return res.status(400).json({ mensagem: 'Cliente já existente com este CPF.' });
    }

    const clienteCriado = new Cliente({ nome, cpf, telefone, motorista: motoristaId });
    await clienteCriado.save();

    res.status(201).json({ mensagem: 'Cliente criado com sucesso!', cliente: clienteCriado });
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    res.status(500).json({ mensagem: 'Erro ao criar cliente.', erro: err.message });
  }
};