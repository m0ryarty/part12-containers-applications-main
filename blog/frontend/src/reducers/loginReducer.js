import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import { setNotification } from "./notificationReducer"
import blogService from '../services/blogs'



const loginSlice = createSlice({
    name: 'login',
    initialState: '',
    reducers: {
        newLogin(state, action) {            
            return state = action.payload
        },
        logout(state, action) {
            return state = ''
        },
        setUser(state, action) {
            return state = action.payload
        }

    }

})

export const loginUser = (loginObj) => {    

    return async dispatch => {
        try {
            const user = await loginService.login(loginObj)
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(newLogin(user))
            
            dispatch(setNotification(
            `Hello ${user.name}`,
                5,
                'info'
            ))

    } catch (error) {
      dispatch(setNotification(
       'Wrong credentials',
        5,
        'danger'
      ))
    }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch(logout())
        
    }
}

export const keepUser = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}


export const {newLogin, logout, setUser} = loginSlice.actions

export default loginSlice.reducer