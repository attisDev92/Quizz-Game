import { createSlice } from "@reduxjs/toolkit"
import { getAllPlayers } from "../services"

const scoresReducer = createSlice({
  name: 'scores',
  initialState: [],
  reducers: {
    setInitialPlayers (_state, action) {
      return action.payload.sort((a, b) => a - b)
    },
    updatePlayer (state, action) {
      const playerToUpdate = action.payload
      const existingIndex = state.findIndex((player) => player.id === playerToUpdate.id);
      if (existingIndex !== -1) {
        return [...state.slice(0, existingIndex), playerToUpdate, ...state.slice(existingIndex + 1)].sort((a, b) => b.score - a.score)
      } else {
        return [...state, playerToUpdate].sort((a, b) => b.score - a.score)
      }
    }
  }
})

export const {setInitialPlayers, updatePlayer} = scoresReducer.actions

export const fetchPlayers = () => {
  return async dispatch => {
    const players = await getAllPlayers()
    dispatch(setInitialPlayers(players))
  }
}

export default scoresReducer.reducer