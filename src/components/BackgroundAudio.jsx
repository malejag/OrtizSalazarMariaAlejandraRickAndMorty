import { useEffect, useRef, useState } from 'react';

const AUDIO_SRC = '/audio/intro.mp3';

function BackgroundAudio() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);

  const playAudio = async () => {
    if (!audioRef.current || hasAudioError) return;

    try {
      audioRef.current.volume = 0.25;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio || hasAudioError) return;

    if (audio.paused) {
      await playAudio();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const startAfterUserInteraction = () => {
      playAudio();
      window.removeEventListener('click', startAfterUserInteraction);
      window.removeEventListener('keydown', startAfterUserInteraction);
    };

    window.addEventListener('click', startAfterUserInteraction);
    window.addEventListener('keydown', startAfterUserInteraction);

    return () => {
      window.removeEventListener('click', startAfterUserInteraction);
      window.removeEventListener('keydown', startAfterUserInteraction);
    };
  }, [hasAudioError]);

  return (
    <div className="music-control" aria-label="Control de música de fondo">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onError={() => setHasAudioError(true)}
      >
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>

      <button
        type="button"
        className="music-btn"
        onClick={toggleAudio}
        title="Activar o pausar música de fondo"
      >
        {hasAudioError ? '🎵 Agrega intro.mp3' : isPlaying ? '🔊 Música' : '🎵 Música'}
      </button>
    </div>
  );
}

export default BackgroundAudio;
