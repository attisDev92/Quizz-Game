import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { createPlayer } from '../redux/playerReducer'
import { Link, useNavigate } from 'react-router-dom'
import { setNotification } from '../redux/notificationReducer'
import { timeNotification } from '../config/globalVar'
import logo from '../assets/Logo.png'
import Loader from './Loader'
import { useEffect, useState } from 'react'
import { setMusic } from '../redux/musicReducer'

const PlayerForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useField()
  const phone = useField()
  const email = useField('email')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(setMusic('default'))
  }, [])



  const handleOnSubmit = event => {
    event.preventDefault()
    setIsLoading(true)
    const newPlayer = {
      name: name.value,
      phone: phone.value,
      email: email.value,
    }
    dispatch(createPlayer(newPlayer))
      .then(() => {
        dispatch(
          setNotification({
            message: `Bienvenido/a ${name.value}`,
            style: 'start',
          }),
        ),
        setIsLoading(false)
        setTimeout(() => {
          navigate('/new_game')
        }, timeNotification)
      }).catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
      
  }

  return (
    <>
      <div>
        {isLoading && <Loader /> }
      </div>
      <form onSubmit={handleOnSubmit} className='form' >
        <legend>NUEVO JUGADOR</legend>
        <input id='name' {...name.input} placeholder='Nombre y Apellido'/>
        <br />
        <input id='phone' {...phone.input} placeholder='Teléfono'/>
        <br />
        <input id='email' {...email.input} placeholder='E-mail'/>
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
