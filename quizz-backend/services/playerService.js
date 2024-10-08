import Player from '../models/Player.js'

export const registerPlayer = async (req, res) => {
  const { name } = req.body
  try {
    const playeres = await Player.find({})

    const isPlayerExist = playeres.find(player => player.name === name)

    if (isPlayerExist) {
      return res.status(200).json({ ...isPlayerExist.toObject(), score: 0 })
    }

    const newPlayer = new Player({
      ...req.body,
    })
    await newPlayer.save()
    res.status(201).json(newPlayer)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar nuevo jugador', error })
  }
}

export const updateScore = async (req, res) => {
  const { score } = req.body
  const { id } = req.params

  try {
    const player = await Player.findById(id)

    if (!player) {
      return res.status(404).json({ error: 'Usuario no existe' })
    }

    player.score = score
    await player.save()
    res.status(200).json(player)
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el puntaje' })
  }
}

export const getScores = async (_req, res) => {
  try {
    const allPlayers = await Player.find({}).sort({ score: -1 })
    res.status(200).json(allPlayers)
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los resultados' })
  }
}
