import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container">
      <div className="error-container">
        <div className="error-icon">🚫</div>
        <h1 className="error-title">404 - Página no encontrada</h1>
        <p className="error-message">La página que buscas no existe en este universo.</p>
        <Link to="/" className="error-btn">
          🏠 Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
