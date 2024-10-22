import { createSlice } from '@reduxjs/toolkit'

const musicReducer = createSlice({
  name: 'music',
  initialState: 'default',
  reducers: {
    setMusic (state, action) {
      return action.payload
    },
  }
})

export const { setMusic } = musicReducer.actions

export const changeMusic = (music) => {
  return dispatch => {
    dispatch(setMusic(music))
    setTimeout(() => {
      dispatch(setMusic('start'))
    }, 3000)
  }
}

export const endGameMusic = (music) => {
  return dispatch => {
    dispatch(setMusic(music))
    setTimeout(() => {
      dispatch(setMusic('default'))
    }, 3000)
  }
}

export default musicReducer.reducer