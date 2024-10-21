import { Routes, Route, Link } from 'react-router-dom'
import Scores from './components/Scores'
import Game from './components/Game'
import PlayerForm from './components/PlayerForm'
import Notification from './components/Notification'
import backgroundIMG from './assets/background.png'
import Start from './components/Start'
const App = () => {
  return (
    <>
      <Notification />
      <Routes>
        <Route path='/scores' element={<Scores />} />
        <Route path='/new_game' element={<Game />} />
        <Route path='/new_player' element={<PlayerForm />} />
        <Route path='/' element={<Start />} />
      </Routes>

      <nav className='menu'>
        <Link to='/new_player'>Nuevo jugador</Link>
        <Link to='/new_game'>Nuevo juego</Link>
        <Link to='/scores'>Resultados</Link>
      </nav>

      <div className='background'>
        <img src={backgroundIMG} />
      </div>
    </>
  )
}

export default App
