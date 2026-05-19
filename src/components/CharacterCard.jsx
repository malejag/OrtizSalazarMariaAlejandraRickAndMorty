function CharacterCard({ character, index = 0 }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  const translateStatus = (status) => {
    const translations = {
      Alive: 'Vivo',
      Dead: 'Muerto',
      unknown: 'Desconocido'
    };
    return translations[status] || status;
  };

  const translateGender = (gender) => {
    const translations = {
      Male: 'Masculino',
      Female: 'Femenino',
      Genderless: 'Sin género',
      unknown: 'Desconocido'
    };
    return translations[gender] || gender;
  };

  return (
    <article
      className="character-card"
      style={{ animationDelay: `${Math.min(index, 16) * 0.045}s` }}
    >
      <div className="image-frame">
        <img src={character.image} alt={character.name} className="character-image" loading="lazy" />
        <span className="card-floating-badge">#{character.id}</span>
      </div>

      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>

        <div className="character-detail">
          <span className="character-label">Estado:</span>
          <span className={`status-badge ${getStatusClass(character.status)}`}>
            <span className="status-dot"></span>
            {translateStatus(character.status)}
          </span>
        </div>

        <div className="character-detail">
          <span className="character-label">Especie:</span>
          <span className="character-value">{character.species}</span>
        </div>

        <div className="character-detail">
          <span className="character-label">Género:</span>
          <span className="character-value">{translateGender(character.gender)}</span>
        </div>

        {character.type && (
          <div className="character-detail">
            <span className="character-label">Tipo:</span>
            <span className="character-value">{character.type}</span>
          </div>
        )}

        <div className="character-detail">
          <span className="character-label">Origen:</span>
          <span className="character-value">{character.origin.name}</span>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
