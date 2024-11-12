const fetch = require('node-fetch');
const OpenCage = require('opencage-api-client');
const geolib = require('geolib');

const API_KEY = '115a82bb3d2742578e2b7f3c20200cd1';

// Função para obter o endereço completo a partir do CEP usando ViaCEP
const getAddressFromCEP = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (!data.erro) {
      // Formata o endereço completo
      return `${data.logradouro}, ${data.localidade}, ${data.uf}`;
    } else {
      throw new Error('CEP inválido ou não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter endereço:', error);
    throw error;
  }
};

// Função para obter coordenadas a partir do endereço usando OpenCage
const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await OpenCage.geocode({ q: address, key: API_KEY });
    if (response.status.code === 200 && response.results.length > 0) {
      return response.results[0].geometry; // Retorna { lat, lng }
    } else {
      throw new Error('Não foi possível obter coordenadas para o endereço.');
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error);
    throw error;
  }
};

// Função principal para calcular a distância entre dois CEPs e exibir os endereços
const calculateDistanceBetweenCEPs = async (cepOrigem, cepDestino) => {
  try {
    // Obter endereço completo para cada CEP
    const enderecoOrigem = await getAddressFromCEP(cepOrigem);
    const enderecoDestino = await getAddressFromCEP(cepDestino);

    //console.log(`Endereço de origem: ${enderecoOrigem}`);
    //console.log(`Endereço de destino: ${enderecoDestino}`);

    // Obter coordenadas a partir dos endereços
    const coordenadasOrigem = await getCoordinatesFromAddress(enderecoOrigem);
    const coordenadasDestino = await getCoordinatesFromAddress(enderecoDestino);

    // Calcular a distância usando geolib
    const distancia = geolib.getDistance(
      { latitude: coordenadasOrigem.lat, longitude: coordenadasOrigem.lng },
      { latitude: coordenadasDestino.lat, longitude: coordenadasDestino.lng }
    );

    // Convertendo a distância para quilômetros com duas casas decimais
    return (distancia / 1000).toFixed(2);
  } catch (error) {
    console.error('Erro ao calcular a distância:', error);
    throw error;
  }
};

/*
const cepOrigem = '13331-224';
const cepDestino = '13348-883';

// Executa a função e exibe a distância junto com os endereços
calculateDistanceBetweenCEPs(cepOrigem, cepDestino)
  .then(distancia => console.log(`A distância entre os CEPs é de ${distancia} km.`))
  .catch(error => console.error('Erro ao calcular a distância:', error));*/

module.exports = { calculateDistanceBetweenCEPs };
