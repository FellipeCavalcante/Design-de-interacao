import { fetchCountries, populateCountriesSelect, displayCountryDetails } from './countries.js';
import { fetchCEP } from './api.js';

(async () => {
  const paises = await fetchCountries();
  populateCountriesSelect(paises);
  displayCountryDetails(paises);
})();

const cepInput = document.getElementById('cep');
const cepButton = document.getElementById('cep-button');
const cepResult = document.getElementById('cep-result');

cepInput.addEventListener('input', () => {
  cepInput.value = cepInput.value.replace(/\D/g, '').slice(0, 8); 
});

cepButton.addEventListener('click', async () => {
  const cep = cepInput.value;
  if (cep.length !== 8) {
    cepResult.innerHTML = '<p class="text-danger">Por favor, insira um CEP válido com 8 dígitos.</p>';
    return;
  }
  const data = await fetchCEP(cep);
  if (data) {
    cepResult.innerHTML = `
      <p><strong>Logradouro:</strong> ${data.logradouro || 'Não disponível'}</p>
      <p><strong>Bairro:</strong> ${data.bairro || 'Não disponível'}</p>
      <p><strong>Cidade:</strong> ${data.localidade}</p>
      <p><strong>Estado:</strong> ${data.uf}</p>
    `;
  } else {
    cepResult.innerHTML = '<p class="text-danger">CEP não encontrado ou inválido.</p>';
  }
});
