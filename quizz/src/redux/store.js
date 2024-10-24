import { configureStore } from '@reduxjs/toolkit'
import player from './playerReducer'
import notification from './notificationReducer'
import music from './musicReducer'
import scores from './scoreReducer'

const store = configureStore({
  reducer: {
    player,
    notification,
    music,
    scores,
  },
})

export default store
