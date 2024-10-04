import { createSlice } from '@reduxjs/toolkit'
import { createNewPlayerService, updateScoreService } from '../services'

const playerReducer = createSlice({
  name: 'player',
  initialState: null,
  reducers: {
    setPlayer(_state, action) {
      return action.payload
    },
    changeScore(state, action) {
      state.score = action.payload
    },
    resetPlayer() {
      return null
    },
  },
})

export const { setPlayer, changeScore, resetPlayer } = playerReducer.actions

export const createPlayer = newPlayer => {
  return async dispatch => {
    const response = await createNewPlayerService(newPlayer)
    dispatch(setPlayer(response))
  }
}

export const updatePlayerScore = (id, score) => {
  return async dispatch => {
    await updateScoreService(id, score)
    dispatch(changeScore(score))
  }
}

export default playerReducer.reducer
