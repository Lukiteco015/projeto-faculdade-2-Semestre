const jwt = require('jsonwebtoken');
const Corrida = require('../models/Corrida');
require('dotenv').config({ path: '.env' });
const JWT_SECRET = process.env.SECRET_KEY;

const getCorridasDoMotorista = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho

    if (!token) {
      return res.status(403).json({ message: 'Token não fornecido' });
    }

    // Decodifica o token para obter o ID do motorista
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const motoristaId = decoded.id;

    // Busca todas as corridas associadas ao motorista
    const corridas = await Corrida.find({ motorista: motoristaId }).populate('cliente');

    res.json({ corridas });
  } catch (error) {
    console.error('Erro ao buscar corridas:', error);
    res.status(500).json({ message: 'Erro ao buscar corridas' });
  }
};

module.exports = { getCorridasDoMotorista };
