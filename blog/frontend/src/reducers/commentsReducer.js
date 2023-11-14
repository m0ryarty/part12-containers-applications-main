import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComment(state, action) {            
            return state = [...state, action.payload] 
        }
    }
})

export const initializeComments = (id) => {
    return async dispatch => {
        const comments = await blogService.getComments(id)
        dispatch(setComments(comments))
    }
}

export const createComment = (comment, id) => {
    console.log(comment)
    return async dispatch => {
        try {             
            const newComment = await blogService.createComments({comment}, id)

            dispatch(appendComment(newComment))
            
            dispatch(setNotification(
                `The comment ${comment} was created`,
                 5,
                'success'
            ))
      
        } catch (error) {
            
            dispatch(setNotification(
            `${error.response.data.error}`,
            5,
            'danger'
            ))
        }
        
    }
}

export const {
    setComments,
    appendComment
    
} = commentsSlice.actions

export default commentsSlice.reducer