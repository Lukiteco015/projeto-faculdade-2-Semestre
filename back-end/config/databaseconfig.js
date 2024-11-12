const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TCC';

const conectarBanco = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o banco de dados TCC estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
};

module.exports = conectarBanco;

