import express from 'express'
import {
  registerPlayer,
  getPlayers,
  updateScore,
} from '../services/playerService.js'

const router = express.Router()

router.post('/', registerPlayer)
router.get('/', getPlayers)
router.put('/score/:id', updateScore)

export default router
