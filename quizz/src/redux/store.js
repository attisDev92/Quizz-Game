import { configureStore } from '@reduxjs/toolkit'
import player from './playerReducer'
import notification from './notificationReducer'
import music from './musicReducer'

const store = configureStore({
  reducer: {
    player,
    notification,
    music
  },
})

export default store
