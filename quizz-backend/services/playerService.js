import Player from '../models/Player.js'

export const registerPlayer = async (req, res) => {
  const {nickname, score} =  req.body
  try {

    const player = await Player.findOne({nickname})

    if (player) {
      player.score = score
      player.save()
      return res.status(201).json(player)
    }
    const newPlayer = new Player({
      ...req.body,
    })

    await newPlayer.save()
    res.status(201).json(newPlayer)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error al registrar nuevo jugador', error })
  }
}

export const getPlayers = async (_req, res) => {
  try {
    const allPlayers = await Player.find({}).sort({ score: -1 })
    res.status(200).json(allPlayers)
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los resultados' })
  }
}
