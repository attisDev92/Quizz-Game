import logo from '../assets/Logo.png'
import back from '../assets/back_question.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { resetPlayer } from '../redux/playerReducer'
import { setMusic } from '../redux/musicReducer'

const Scores = () => {
  const initialPlayers = useSelector(state => state.scores)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setMusic('default'))
    dispatch(resetPlayer())
  }, [])

  if (!initialPlayers) {
    return <>No hay resultados disponibles</>
  }

  const playersScore = initialPlayers.slice(0, 20)

  return (
    <div className='scores'>
      <Link to='/'>
        <img src={logo} />
      </Link>
      <h2>TOP RESULTADOS</h2>
      <div className='container__table'>
        <table>
          <tbody>
          {playersScore.map((player, i) => (
            <tr key={player.id}>
              <td>{i + 1}</td>
              <td>{player.nickname}</td>
              <td>{player.score}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <img src={back} />
      </div>
    </div>
  )
}

export default Scores
