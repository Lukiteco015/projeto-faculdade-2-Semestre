const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/';

const conectarBanco = () => {
  mongoose.connect(DB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch(err => {
    console.error("Erro encontrado: ", err);
  });
};

module.exports = conectarBanco;

