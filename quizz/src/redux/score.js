import { createSlice } from "@reduxjs/toolkit"

const scoreReducer = createSlice({
  name: 'score',
  initialState: 100,
  reducers: {
    plusScore (state) {
      const newScore = state + 100
      return newScore
    },
    resetScore () {
      return 100
    }
  }
})

export const { plusScore, resetScore } = scoreReducer.actions
export default scoreReducer.reducer