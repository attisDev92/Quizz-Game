import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    active: false,
    style: '',
  },
  reducers: {
    activeNotification(state, action) {
      state.message = action.payload.message
      state.active = true
      state.style = action.payload.style
    },
    desactiveNotification(state) {
      state.message = ''
      state.active = false
      state.style = ''
    },
  },
})

export const { activeNotification, desactiveNotification } =
  notificationReducer.actions

//style options: warning, error, success
export const setNotification = (message, style) => {
  return dispatch => {
    dispatch(activeNotification(message, style))
    setTimeout(() => {
      dispatch(desactiveNotification())
    }, 3000)
  }
}

export default notificationReducer.reducer
