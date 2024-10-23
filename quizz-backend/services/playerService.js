import Player from '../models/Player.js'

export const registerPlayer = async (req, res) => {
  const {email} = req.body
  try {
    const playerExist = await Player.findOne({email})

    if( playerExist ) {
      return res.status(200).json(playerExist)
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

export const getPlayers = async (_req, res) => {
  try {
    const allPlayers = await Player.find({}).sort({ score: -1 })
    res.status(200).json(allPlayers)
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los resultados' })
  }
}
