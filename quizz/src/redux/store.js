import { configureStore } from '@reduxjs/toolkit'
import player from './playerReducer'
import notification from './notificationReducer'
import music from './musicReducer'
import players from './playersReducer'
import score from '../redux/score'

const store = configureStore({
  reducer: {
    player,
    notification,
    music,
    players,
    score,
  },
})

export default store
