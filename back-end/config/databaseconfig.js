const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://lucasrofran15:lukitinhas2021@banco-tcc.czujq.mongodb.net/TCC?retryWrites=true&w=majority';

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

