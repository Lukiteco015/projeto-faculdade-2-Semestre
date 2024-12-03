const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');
require('dotenv').config({ path: '.env'})
const JWT_SECRET = process.env.SECRET_KEY;

const getClientesDoMotorista = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Pega o token do header

    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // O ID do motorista estará no payload do token
    const motoristaId = decoded.id;

    // Filtra os clientes que têm o campo "motorista" igual ao ID do motorista logado
    const clientes = await Cliente.find({ motorista: motoristaId });

    // Retorna os clientes encontrados
    res.json({ clientes });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
};

module.exports = { getClientesDoMotorista };
