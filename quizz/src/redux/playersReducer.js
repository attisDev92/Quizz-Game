import { createSlice } from "@reduxjs/toolkit"
import { getAllPlayersService } from "../services"

const playersReducers  = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    setPlayers(_state, action) {
      return action.payload
    },
    updatePlayer(state, action) {
      const playerToUpdate = action.payload
      state.push(playerToUpdate)
    }
  }
})

export const { setPlayers, updatePlayer } = playersReducers.actions

export const fetchInitialPlayers = () => {
  return async dispatch => {
    const players = await getAllPlayersService()
    console.log(players)
    dispatch(setPlayers(players))
  }
}

export default playersReducers.reducer