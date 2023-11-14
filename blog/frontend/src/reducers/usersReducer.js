import { createSlice } from "@reduxjs/toolkit"
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers (state, action) {            
            state = action.payload            
            return state
        }

    }
})

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAllUsers()        
        dispatch(setUsers(users))
    }
}

/* console.log(usersSlice.reducer()) */

export const {setUsers }= usersSlice.actions

export default usersSlice.reducer