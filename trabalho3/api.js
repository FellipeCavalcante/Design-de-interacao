export async function fetchCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao acessar a API do ViaCEP');
      const data = await response.json();
      if (data.erro) throw new Error('CEP não encontrado');
      return data;
    } catch (error) {
      console.error('Erro na consulta do CEP:', error);
      return null;
    }
  }
  