import express from 'express'
import {
  registerPlayer,
  getScores,
  updateScore,
} from '../services/playerService.js'

const router = express.Router()

router.post('/', registerPlayer)
router.get('/', getScores)
router.put('/score/:id', updateScore)

export default router
