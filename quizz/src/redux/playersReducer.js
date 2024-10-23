import { createSlice } from "@reduxjs/toolkit"
import { getAllPlayersService } from "../services"

const playersReducers  = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    setPlayers(_state, action) {
      return action.payload.sort()
    },
    updatePlayer(state, action) {
      const playerToUpdate = action.payload;
      const existingIndex = state.findIndex((player) => player.id === playerToUpdate.id);

      if (existingIndex !== -1) {
        return [...state.slice(0, existingIndex), playerToUpdate, ...state.slice(existingIndex + 1)].sort((a, b) => b.score - a.score)
      } else {
        return [...state, playerToUpdate].sort((a, b) => b.score - a.score)
      }
    }
  }
})

export const { setPlayers, updatePlayer } = playersReducers.actions

export const fetchInitialPlayers = () => {
  return async dispatch => {
    const players = await getAllPlayersService()
    dispatch(setPlayers(players))
  }
}

export default playersReducers.reducer