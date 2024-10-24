import express from 'express'
import {
  registerPlayer,
  getPlayers,
} from '../services/playerService.js'

const router = express.Router()

router.post('/', registerPlayer)
router.get('/', getPlayers)

export default router
