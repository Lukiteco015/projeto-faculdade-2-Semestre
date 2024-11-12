const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const motoristaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, unique: true, required: true },
    foto: { type: String, required: true },
    /*status: { type: String, enum: ['Ativo', 'Inativo'], required: true },*/
    senha: { type: String, required: true },
    idveiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Veiculo' },
    /*localizacaoAtual: {
        latitude: Number,
        longitude: Number,
    }*/
   email: { type: String, required: true}
});

motoristaSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

module.exports = mongoose.model('Motorista', motoristaSchema);
