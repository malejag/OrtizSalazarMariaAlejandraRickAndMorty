import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { RickAndMortyAPI } from '../services/api.js';

function FilterBySpecies() {
  const { speciesName } = useParams();
  const navigate = useNavigate();

  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [availableSpecies, setAvailableSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(speciesName || 'all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterCharacters = (characters, species) => {
    if (species === 'all' || !species) {
      setFilteredCharacters(characters);
      return;
    }

    const filtered = characters.filter((char) => char.species.toLowerCase() === species.toLowerCase());
    setFilteredCharacters(filtered);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const characters = await RickAndMortyAPI.getAllCharacters();
      setAllCharacters(characters);

      const speciesSet = new Set(characters.map((char) => char.species));
      const species = Array.from(speciesSet).sort();
      setAvailableSpecies(species);

      filterCharacters(characters, speciesName ? decodeURIComponent(speciesName) : 'all');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeciesChange = (species) => {
    setSelectedSpecies(species);
    filterCharacters(allCharacters, species);

    if (species === 'all') {
      navigate('/filter');
    } else {
      navigate(`/species/${encodeURIComponent(species)}`);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (allCharacters.length > 0) {
      const species = speciesName ? decodeURIComponent(speciesName) : 'all';
      setSelectedSpecies(species);
      filterCharacters(allCharacters, species);
    }
  }, [speciesName, allCharacters]);

  if (loading) {
    return <LoadingSpinner message="Cargando especies disponibles..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  return (
    <div className="container">
      <h1 className="page-title">Filtrar por Especie</h1>
      <p className="page-subtitle">Selecciona una especie para ver los personajes</p>

      <div className="filter-section">
        <h2 className="filter-title">🔬 Especies Disponibles</h2>
        <div className="filter-buttons">
          <button className={`filter-btn ${selectedSpecies === 'all' ? 'active' : ''}`} onClick={() => handleSpeciesChange('all')}>
            Todas las especies ({allCharacters.length})
          </button>

          {availableSpecies.map((species) => {
            const count = allCharacters.filter((char) => char.species === species).length;

            return (
              <button key={species} className={`filter-btn ${selectedSpecies === species ? 'active' : ''}`} onClick={() => handleSpeciesChange(species)}>
                {species} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="page-subtitle">
          {selectedSpecies === 'all'
            ? `Mostrando todos los personajes (${filteredCharacters.length})`
            : `Mostrando ${filteredCharacters.length} personaje${filteredCharacters.length !== 1 ? 's' : ''} de especie ${selectedSpecies}`}
        </h3>

        {filteredCharacters.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p className="empty-message">No se encontraron personajes de esta especie</p>
          </div>
        ) : (
          <div className="characters-grid">
            {filteredCharacters.map((character, index) => (
              <CharacterCard key={character.id} character={character} index={index} />
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        <p>Filtrando entre {allCharacters.length} personajes del universo Rick and Morty</p>
      </div>
    </div>
  );
}

export default FilterBySpecies;
