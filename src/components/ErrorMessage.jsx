function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">¡Oops! Algo salió mal</h2>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="error-btn" onClick={onRetry}>
          🔄 Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
