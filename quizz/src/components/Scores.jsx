import { useEffect, useState } from 'react'
import { getAllPlayersService } from '../services'
import logo from '../assets/Logo.png'
import back from '../assets/back_question.png'
import { Link } from 'react-router-dom'

const Scores = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getAllPlayersService()
        setPlayers(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchScores()
  }, [])

  if (!players) {
    return <>No hay resultados disponibles</>
  }

  const playersScore = players.slice(0, 10)

  return (
    <div className='scores'>
      <Link to='/'>
        <img src={logo} />
      </Link>
      <h2>TOP RESULTADOS</h2>
      <div className='container__table'>
        <table>
          {playersScore.map((player, i) => (
            <tr key={player.id}>
              <td>{i + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </table>
        <img src={back} />
      </div>
    </div>
  )
}

export default Scores
