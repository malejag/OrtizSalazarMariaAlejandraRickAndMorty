import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-glow" aria-hidden="true"></div>
      <div className="nav-container">
        <Link to="/" className="nav-brand" aria-label="Ir al inicio">
          <span className="brand-icon-wrap">
            <img src="/icono.png" alt="" className="brand-icon" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <span className="brand-title">Rick and Morty</span>
            <span className="brand-subtitle">Multiverse Explorer</span>
          </span>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link home-start-link ${isActive('/') ? 'active' : ''}`}>
              <img src="/icono.png" alt="" className="nav-link-icon" aria-hidden="true" />
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/filter"
              className={`nav-link ${isActive('/filter') || location.pathname.startsWith('/species/') ? 'active' : ''}`}
            >
              🔍 Filtrar por Especie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
