import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { createPlayer } from '../redux/playerReducer'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../redux/notificationReducer'
import { timeNotification } from '../config/globalVar'
import logo from '../assets/Logo.png'

const PlayerForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useField()
  const phone = useField('number', 0)
  const email = useField('email')

  const handleOnSubmit = event => {
    event.preventDefault()
    const newPlayer = {
      name: name.value,
      phone: phone.value,
      email: email.value,
    }
    dispatch(createPlayer(newPlayer)).then(() => {
      dispatch(
        setNotification({
          message: `Bienvenido/a ${name.value}`,
          style: 'success',
        }),
      )
      setTimeout(() => {
        navigate('/new_game')
      }, timeNotification)
    })
  }

  return (
    <form onSubmit={handleOnSubmit} className='form' >
      <legend>NUEVO JUGADOR</legend>
      <input id='name' {...name.input} placeholder='Nombre y Apellido'/>
      <br />
      <input id='phone' {...phone.input} placeholder='Teléfono'/>
      <br />
      <input id='email' {...email.input} placeholder='E-mail'/>
      <br />
      <button type='submit'>Iniciar partida</button>
      <img src={logo} />
    </form>
  )
}

export default PlayerForm
