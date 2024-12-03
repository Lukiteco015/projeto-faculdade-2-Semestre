const axios = require('axios');

const calculateDistanceBetweenAddresses = async (enderecoOrigem, enderecoDestino) => {
  try {
    // Substitua a chave pela sua chave de API válida da Distance Matrix
    const apiKey = 'jdFG4cta1Op1RGOTlwVlxHK5kox7pDGr64YMpdkIN2oGF7LxRyzrScOKTSnX9tsU';
    
    // Construir a URL com os endereços diretamente (geocodificados pela API de Distance Matrix)
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${encodeURIComponent(enderecoOrigem)}&destinations=${encodeURIComponent(enderecoDestino)}&key=${apiKey}`;

    // Fazer a requisição à API de Distance Matrix
    const response = await axios.get(url);

    // Verificar a resposta da API
    if (response.data.status === 'OK' && response.data.rows[0].elements[0].status === 'OK') {
      const distancia = response.data.rows[0].elements[0].distance.value; // Distância em metros
      return (distancia / 1000).toFixed(2); // Convertendo para quilômetros e arredondando
    } else {
      throw new Error('Não foi possível calcular a distância.');
    }
  } catch (error) {
    console.error('Erro ao calcular a distância:', error);
    throw error;
  }
};

module.exports = { calculateDistanceBetweenAddresses };
