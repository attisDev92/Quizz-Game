import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { resetPlayer, setPlayer } from '../redux/playerReducer'
import { Link, useNavigate } from 'react-router-dom'
import { timeNotification } from '../config/globalVar'
import logo from '../assets/Logo.png'
import Loader from './Loader'
import { useEffect, useState } from 'react'
import { setMusic } from '../redux/musicReducer'

const PlayerForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const nickName = useField()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(setMusic('default'))
  }, [])

  const handleOnSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    dispatch(resetPlayer())
    dispatch(setPlayer(nickName.value))
    setIsLoading(false)
    nickName.reset()
    navigate('/new_game')
  }

  return (
    <>
      <div>
        {isLoading && <Loader /> }
      </div>
      <form onSubmit={handleOnSubmit} className='form' >
        <legend>NUEVO JUGADOR</legend>
        <input id='name' {...nickName.input} placeholder='Nombre' />
        <br />
        <button type='submit'>Iniciar partida</button>
        <Link to='/'>
          <img src={logo} />
        </Link>       
      </form>
    </>
  )
}

export default PlayerForm
