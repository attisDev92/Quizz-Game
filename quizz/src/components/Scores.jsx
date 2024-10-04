import { useEffect, useState } from 'react'
import { getAllPlayersService } from '../services'

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
      <h2>Top resultados</h2>
      <table>
        {playersScore.map((player, i) => (
          <tr key={player.id}>
            <td>{i + 1}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Scores
