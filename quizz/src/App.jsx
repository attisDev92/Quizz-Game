import { Routes, Route, Link } from 'react-router-dom'
import Scores from './components/Scores'
import Game from './components/Game'
import PlayerForm from './components/PlayerForm'
import Notification from './components/Notification'
import backgroundIMG from './assets/background.png'
import Start from './components/Start'
import FullScreenButton from './components/FullscreenButton'
import MusicPlayer from './components/MusicPlayer'
import Result from './components/Result'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchPlayers } from './redux/scoreReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPlayers())
  },[dispatch])

  return (
    <>
      <Notification />

      <Routes>
        <Route path='/scores' element={<Scores />} />
        <Route path='/new_game' element={<Game />} />
        <Route path='/new_player' element={<PlayerForm />} />
        <Route path='/result' element={<Result />} />
        <Route path='/' element={<Start />} />
      </Routes>

      <nav className='menu'>
        <Link to='/new_player'>Nuevo jugador</Link>
        <Link to='/new_game'>Nuevo juego</Link>
        <Link to='/scores'>Resultados</Link>
      </nav>

      <FullScreenButton />
      <div className='background'>
        <img src={backgroundIMG} />
      </div>
      <MusicPlayer />
    </>
  )
}

export default App
