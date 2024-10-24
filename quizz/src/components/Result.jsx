import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setMusic } from "../redux/musicReducer"
import back_notification from '../assets/back_notification.png'
import error_notification from '../assets/error_notification.png'
import { updatePlayer } from "../redux/scoreReducer"
import { createPlayer } from "../services"
import { resetPlayer } from "../redux/playerReducer"

const Result = () => {
  const player = useSelector(state => state.player)
  const dispath = useDispatch()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  
  useEffect(() => {
    if (player.score === 300) {
      setResult('win')
      dispath(setMusic('win'))
    } else {
      setResult('lose')
      dispath(setMusic('lose'))
    }

    const sendResults = async() => {
      try {
        const playerSaved = await createPlayer(player)
        console.log(playerSaved)
        dispath(updatePlayer(playerSaved))
      } catch (error) {
        console.error(error)
      }
    }

    sendResults()
  }, [])  

  setTimeout(() => {
    dispath(resetPlayer())
    navigate('/scores')
  }, 7000)

  if(!player.nickname) {
    navigate('/')
  }

  return (
    <div className='result__container'>
      {result === 'win' 
        ? (
          <>
            <h1>GANASTE</h1>
            <h1>FELICIDADES</h1>
          </>
        ) : (
          <>
            <h1>Sigue intentando</h1>
          </>
        )
      }
      <img
        src={
            result === 'win'
            ? back_notification 
            : error_notification 
        }
        alt={result}
      />
      {result === 'win' 
        ? (
          <>
            <p>{player.nickname} tu puntaje es:</p>
            <p>{player.score}</p>
          </>
        ) : (
          <>
            <p>{player.nickname} tu puntaje es:</p>
            <p>{player.score}</p>
            <p>Más suerte para la próxima</p>
          </>
        )
      }
    </div>
  )
}

export default Result
