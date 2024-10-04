import { configureStore } from '@reduxjs/toolkit'
import player from './playerReducer'
import notification from './notificationReducer'

const store = configureStore({
  reducer: {
    player,
    notification,
  },
})

export default store
