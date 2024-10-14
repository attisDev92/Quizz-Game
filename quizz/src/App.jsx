import { Routes, Route, Link } from 'react-router-dom'
import Scores from './components/Scores'
import Game from './components/Game'
import PlayerForm from './components/PlayerForm'
import Notification from './components/Notification'
import backgroundIMG from './assets/background.jpg'
const App = () => {
  return (
    <>
      <h1 className='title'> Quién quiere ser millonario? by PROGRESS GROUP
      </h1>

      <Notification />
      <Routes>
        <Route path='/scores' element={<Scores />} />
        <Route path='/new_game' element={<Game />} />
        <Route path='/new_player' element={<PlayerForm />} />
        <Route path='/' element={<PlayerForm />} />
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
