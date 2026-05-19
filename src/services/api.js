const API_BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTER_ENDPOINT = `${API_BASE_URL}/character`;

async function fetchJson(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al consultar: ${url}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(`La API no devolvió JSON. Verifica que estés usando ${API_BASE_URL} y no la página principal.`);
  }

  return response.json();
}

export class RickAndMortyAPI {
  static async getAllCharacters() {
    try {
      let characters = [];
      let nextUrl = CHARACTER_ENDPOINT;

      while (nextUrl) {
        const data = await fetchJson(nextUrl);
        characters = characters.concat(data.results || []);
        nextUrl = data.info?.next || null;
      }

      return characters;
    } catch (error) {
      console.error('Error al obtener personajes:', error);
      throw new Error(
        'No se pudieron cargar los personajes. Revisa tu conexión y confirma que la URL usada sea https://rickandmortyapi.com/api/character'
      );
    }
  }

  static async getCharactersBySpecies(species) {
    const allCharacters = await this.getAllCharacters();

    if (!species || species === 'all') {
      return allCharacters;
    }

    return allCharacters.filter(
      (character) => character.species.toLowerCase() === decodeURIComponent(species).toLowerCase()
    );
  }

  static async getAvailableSpecies() {
    const allCharacters = await this.getAllCharacters();
    const speciesSet = new Set(allCharacters.map((character) => character.species));
    return Array.from(speciesSet).sort();
  }

  static async searchCharactersByName(name) {
    const allCharacters = await this.getAllCharacters();

    if (!name) {
      return allCharacters;
    }

    return allCharacters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
