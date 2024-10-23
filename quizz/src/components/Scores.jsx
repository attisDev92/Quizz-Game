import logo from '../assets/Logo.png'
import back from '../assets/back_question.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Scores = () => {
  const initialPlayers = useSelector(state => state.players)

  if (!initialPlayers) {
    return <>No hay resultados disponibles</>
  }

  const playersScore = initialPlayers.filter(player => player.score > 100).sort((a, b) => b.score - a.score).slice(0, 10)

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
              <td>{player.name}</td>
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
