export async function fetchCountries() {
    try {
      const response = await fetch('./paises.json');
      if (!response.ok) throw new Error('Erro ao carregar os países.');
      const paises = await response.json();
      return paises;
    } catch (error) {
      console.error('Erro ao carregar os países:', error);
      return [];
    }
  }
  
  export function populateCountriesSelect(paises) {
    const select = document.getElementById('countries-select');
  
    //**map**
    select.innerHTML = paises.map(({ nome_pais }) => `<option value="${nome_pais}">${nome_pais}</option>`).join('');
  }
  
  export function displayCountryDetails(paises) {
    const select = document.getElementById('countries-select');
    const detailsDiv = document.getElementById('country-details');
  
    select.addEventListener('change', () => {
      const selectedCountry = paises.find(pais => pais.nome_pais === select.value); //**Destructuring**
      if (selectedCountry) {
        detailsDiv.innerHTML = `
          <p><strong>Nome Internacional:</strong> ${selectedCountry.nome_pais_int}</p>
          <p><strong>Gentílico:</strong> ${selectedCountry.gentilico}</p>
          <p><strong>Sigla:</strong> ${selectedCountry.sigla}</p>
        `;
      } else {
        detailsDiv.innerHTML = '<p>Selecione um país válido.</p>';
      }
    });
  }
  