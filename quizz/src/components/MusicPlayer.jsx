import { useEffect, useRef, useState } from 'react'
import Howler from 'howler'
import { useSelector } from 'react-redux'

const MusicPlayer = () => {
  const sound = useRef(null)
  const music = useSelector(state => state.music)
  const [isPlaying, setIsPlaying] = useState(false)

  const musicMap =  {
    default: '/musica1.mp3', 
    start: '/musica2.mp3',
    success: '/musica3.mp3',
    error: '/musica4.mp3',
    win: '/musica5.mp3',
    lose: '/musica6.mp3'
  };

  const handleClick = () => {
    setIsPlaying(true)
  };

  useEffect(() => {
    if (isPlaying) {
      // Crear un nuevo sonido de Howler.js
      const newSound = new Howler.Howl({
        src: [`${musicMap[music]}`],
        html5: true,
        volume: 0.5,
        autoplay: true,
        onend: () => {
          // Reproducir la siguiente música según el estado de la notificación
          const nextMusic = musicMap[music] || 'musica1.mp3';
          newSound.load();
          newSound.play(nextMusic);
        }
      });

      // Guardar la referencia del sonido
      sound.current = newSound;

      // Reproducir o pausar según el estado isPlaying
      if (isPlaying) {
        newSound.play();
      } else {
        newSound.pause();
      }
    }

    // Limpiar cuando el componente se desmonta
    return () => {
      if (sound.current) {
        sound.current.unload();
      }
    };
  }, [ isPlaying, music]);

  return (
    <div onClick={handleClick} className='sound__button'>
      <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
        <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
      </svg>
    </div>
  );
};

export default MusicPlayer;