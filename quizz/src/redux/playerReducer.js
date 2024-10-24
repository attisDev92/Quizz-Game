import { createSlice } from '@reduxjs/toolkit'

const playerReducer = createSlice({
  name: 'player',
  initialState: {
    nickname: '',
    score: 0,
  },
  reducers: {
    setPlayer(state, action) {
      state.nickname = action.payload
      state.score = 0
    },
    resetPlayer(state) {
      state.nickname= ''
      state.score= 0
    },
    plusScore(state) {
      state.score = state.score + 100
    },
  },
})

export const {setPlayer, resetPlayer, plusScore} = playerReducer.actions
export default playerReducer.reducer
