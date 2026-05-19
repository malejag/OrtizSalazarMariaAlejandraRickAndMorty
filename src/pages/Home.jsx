import { useEffect, useMemo, useState } from 'react';
import CharacterCard from '../components/CharacterCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { RickAndMortyAPI } from '../services/api.js';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RickAndMortyAPI.getAllCharacters();
      setCharacters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = useMemo(() => {
    const normalizedSearch = searchName.trim().toLowerCase();

    if (!normalizedSearch) {
      return characters;
    }

    return characters.filter((character) =>
      character.name.toLowerCase().includes(normalizedSearch)
    );
  }, [characters, searchName]);

  const stats = useMemo(() => {
    const alive = characters.filter((character) => character.status === 'Alive').length;
    const species = new Set(characters.map((character) => character.species)).size;

    return {
      total: characters.length,
      alive,
      species
    };
  }, [characters]);

  const clearSearch = () => {
    setSearchName('');
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Abriendo portal interdimensional..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadCharacters} />;
  }

  return (
    <main className="container">
      <section className="hero-section">
        <div className="hero-orb hero-orb-one" aria-hidden="true"></div>
        <div className="hero-orb hero-orb-two" aria-hidden="true"></div>

        <div className="hero-content">
          <p className="eyebrow">🧪 API oficial + React</p>
          <h1 className="page-title">Explorador de Personajes</h1>
          <p className="page-subtitle">
            Busca, filtra y navega por el multiverso de Rick and Morty.
          </p>

          
        </div>

        <div className="hero-card" aria-label="Botón de inicio con icono personalizable">
          <img src="/icono.png" alt="Icono de inicio" className="hero-icon" />
        </div>
      </section>

      <section className="stats-panel" aria-label="Resumen de personajes">
        <article className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Personajes</span>
        </article>
        <article className="stat-card">
          <span className="stat-number">{stats.alive}</span>
          <span className="stat-label">Vivos</span>
        </article>
        <article className="stat-card">
          <span className="stat-number">{stats.species}</span>
          <span className="stat-label">Especies</span>
        </article>
      </section>

      <section className="search-section" aria-label="Buscador por nombre">
        <label className="search-label" htmlFor="character-search">
          🔎 Buscar personaje por nombre
        </label>

        <div className="search-box">
          <input
            id="character-search"
            className="search-input"
            type="text"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
            placeholder="Ejemplo: Rick, Morty, Summer..."
            autoComplete="off"
          />

          {searchName && (
            <button type="button" className="search-clear-btn" onClick={clearSearch}>
              Limpiar
            </button>
          )}
        </div>

        <p className="search-results-text">
          {searchName.trim()
            ? `Resultados para "${searchName}": ${filteredCharacters.length}`
            : `Mostrando todos los personajes: ${filteredCharacters.length}`}
        </p>
      </section>

      {filteredCharacters.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-message">No se encontraron personajes con ese nombre</p>
        </div>
      ) : (
        <div className="characters-grid" id="characters">
          {filteredCharacters.map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} />
          ))}
        </div>
      )}

      <div className="footer">
        <p>
          Desarrollado con ❤️ usando{' '}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
            Rick and Morty API
          </a>
        </p>
      </div>
    </main>
  );
}

export default Home;
