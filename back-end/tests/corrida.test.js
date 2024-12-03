const request = require('supertest');
const app = require('../app'); // O caminho para o arquivo que inicializa o Express

describe('POST /api/corridas/criar', () => {
  it('deve criar uma corrida e calcular o precoTotal corretamente', async () => {
    const novoCadastro = {
      idcliente: new mongoose.Types.ObjectId(), 
      idmotorista: new mongoose.Types.ObjectId(), 
      origem: { endereco: 'Rua A' },
      destino: { endereco: 'Rua B' },
      precoCombustivel: 5.5,
      precoKM: 10,
      consumoMedio: 8,
    };

    const resposta = await request(app)
      .post('/api/corridas/criar')
      .send(novoCadastro);

    expect(resposta.status).toBe(201);
    expect(resposta.body.message).toBe('Corrida cadastrada com sucesso');
    expect(resposta.body.corrida).toHaveProperty('precoTotal');
    expect(resposta.body.corrida.precoTotal).toBeDefined();
  });

  it('deve retornar erro 400 quando faltar campos obrigatórios', async () => {
    const novoCadastroIncompleto = {
      idcliente: new mongoose.Types.ObjectId(),
      idmotorista: new mongoose.Types.ObjectId(),
      origem: { endereco: 'Rua A' },
      destino: { endereco: 'Rua B' },
      // Faltando campos obrigatórios como precoCombustivel, precoKM, etc.
    };

    const resposta = await request(app)
      .post('/api/corridas/criar')
      .send(novoCadastroIncompleto);

    expect(resposta.status).toBe(400);
    expect(resposta.body.error).toBe('Por favor, forneça todos os campos obrigatórios.');
  });
});
