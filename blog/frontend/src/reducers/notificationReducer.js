import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: null,
    display: 'none',
    background: 'white'
 }

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        newNotification(state, action) {
            
            return state = {
        message: action.payload.message,
          display: 'block',
        background: action.payload.background
      }
    },

    closeNotification(state, action) {
      return state = {
        message: action.payload.message,
          display: 'none',
        background: action.payload.background
      }

           
        }
    }
})

export const { newNotification, closeNotification } = notificationSlice.actions

export const setNotification = (message, time, background) => {

    
  
  return dispatch => {dispatch(newNotification({message, background}))
    setTimeout(() => {
        dispatch(closeNotification({
            message: null,
            background: 'white'
        }))
    }, time * 1000)
  }

}


export default notificationSlice.reducer