import React, { useState } from 'react';
import axios from 'axios';

function CriarRelatorioConsumo() {
  const [data, setData] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [kilometragemPorLitro, setKilometragemPorLitro] = useState('');
  const [consumoCombustivel, setConsumoCombustivel] = useState('');
  const [relatorioCriado, setRelatorioCriado] = useState(null);

  // Função para calcular o consumo de combustível
  const calcularConsumoCombustivel = () => {
    const kmPorLitro = parseFloat(kilometragemPorLitro);
    const preco = parseFloat(precoCombustivel);
    const km = parseFloat(quilometragem);
    
    if (!isNaN(kmPorLitro) && !isNaN(preco) && !isNaN(km)) {
      const consumo = preco * (km / kmPorLitro);
      setConsumoCombustivel(consumo.toFixed(2)); // Armazena o valor calculado
    }
  };

  // Função para enviar os dados e criar o relatório
  const criarRelatorio = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/relatorios/consumo/criar',
        {
          data,
          quilometragem,
          consumoCombustivel,
          motoristaId: 'exemplo-id-do-motorista', // Deve ser o id do motorista
          veiculoId: 'exemplo-id-do-veiculo', // Deve ser o id do veículo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Exibe os dados do relatório gerado na tela
      setRelatorioCriado(response.data.novoRelatorio);
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
    }
  };

  return (
    <div>
      <h2>Criar Relatório de Consumo</h2>
      
      <div>
        <label>Data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      
      <div>
        <label>Quilometragem:</label>
        <input
          type="number"
          value={quilometragem}
          onChange={(e) => setQuilometragem(e.target.value)}
        />
      </div>

      <div>
        <label>Preço do Combustível:</label>
        <input
          type="number"
          value={precoCombustivel}
          onChange={(e) => setPrecoCombustivel(e.target.value)}
        />
      </div>

      <div>
        <label>Quilometragem por Litro:</label>
        <input
          type="number"
          value={kilometragemPorLitro}
          onChange={(e) => setKilometragemPorLitro(e.target.value)}
        />
      </div>

      <div>
        <button onClick={calcularConsumoCombustivel}>Calcular Consumo de Combustível</button>
      </div>

      {consumoCombustivel && (
        <div>
          <p><strong>Consumo de Combustível Calculado: </strong> R${consumoCombustivel}</p>
        </div>
      )}

      <div>
        <button onClick={criarRelatorio}>Criar Relatório</button>
      </div>

      {relatorioCriado && (
        <div>
          <h3>Relatório Criado com Sucesso:</h3>
          <p><strong>Data:</strong> {relatorioCriado.data}</p>
          <p><strong>Quilometragem:</strong> {relatorioCriado.quilometragem} km</p>
          <p><strong>Consumo de Combustível:</strong> R${relatorioCriado.consumoCombustivel}</p>
        </div>
      )}
    </div>
  );
}

export default CriarRelatorioConsumo;
