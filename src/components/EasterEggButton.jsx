import { useEffect, useRef, useState } from 'react';

const EASTER_AUDIO_SRC = '/audio/easter.mp3';
const EASTER_GIF_SRC = '/easter.gif';
const REQUIRED_CLICKS = 10;
const RESET_TIME_MS = 2500;
const GIF_DURATION_MS = 6500;

function EasterEggButton() {
  const [clickCount, setClickCount] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const [showEasterGif, setShowEasterGif] = useState(false);
  const resetTimerRef = useRef(null);
  const gifTimerRef = useRef(null);

  const playEasterAudio = () => {
    const audio = new Audio(EASTER_AUDIO_SRC);
    audio.volume = 0.8;

    audio.play().catch(() => {
      // Si el navegador bloquea el audio o falta easter.mp3, la app sigue funcionando.
    });
  };

  const activateEasterEgg = () => {
    setIsActivated(true);
    setShowEasterGif(true);
    setClickCount(0);
    playEasterAudio();

    if (gifTimerRef.current) {
      clearTimeout(gifTimerRef.current);
    }

    gifTimerRef.current = setTimeout(() => {
      setShowEasterGif(false);
    }, GIF_DURATION_MS);
  };

  const handleSecretClick = () => {
    if (isActivated) return;

    setClickCount((currentCount) => {
      const nextCount = currentCount + 1;

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      if (nextCount >= REQUIRED_CLICKS) {
        activateEasterEgg();
        return 0;
      }

      resetTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, RESET_TIME_MS);

      return nextCount;
    });
  };

  useEffect(() => {
    if (isActivated) {
      document.body.classList.add('easter-theme');
    }

    return () => {
      document.body.classList.remove('easter-theme');
    };
  }, [isActivated]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      if (gifTimerRef.current) {
        clearTimeout(gifTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`secret-button ${isActivated ? 'secret-button-active' : ''}`}
        onClick={handleSecretClick}
        aria-label="Botón secreto"
        title=""
      >
        <img src="/imagenboton.jpg" alt="" aria-hidden="true" />
      </button>

      {showEasterGif && (
        <img
          className="easter-gif"
          src={EASTER_GIF_SRC}
          alt="Easter egg animado"
          aria-live="polite"
        />
      )}
    </>
  );
}

export default EasterEggButton;
