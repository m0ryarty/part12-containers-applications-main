import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload.sort((a,b) => b.likes - a.likes)
        },
        appendBlog(state, action) {            
            return state = [...state, action.payload] 
        },
        addLikes(state, action) {            
           return state.map(blog=> blog.id === action.payload.id ? action.payload : blog).sort((a,b) => b.likes - a.likes)
        },
        removeBlog(state, action) {            
            return state = state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content, user) => {
    
    return async dispatch => {
        try {             
            const newBlog = await blogService.create(content)
                        

            const newUser = [{
                id: newBlog.user[0],
                username: user.username,
                name: user.name
            }]
            
            const newBlogObj = {
                ...newBlog,
                user: newUser
            }

            dispatch(appendBlog(newBlogObj))
            
            dispatch(setNotification(
                `The blog ${newBlog.title} was created`,
                 5,
                'success'
            ))
      
        } catch (error) {
            console.log(error.response.data.error)
            dispatch(setNotification(
            `${error.response.data.error}`,
            5,
            'danger'
            ))
        }
        
    }
}

export const updateLike = (blogToUpdate, user) => {    

    return async dispatch => {

    const objToUpdate = {
      user: user.id,
      likes: parseInt(blogToUpdate.likes) + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    }    

    const newLike = await blogService.update(blogToUpdate.id, objToUpdate)        
    dispatch(addLikes(newLike))
    dispatch(setNotification(
       `The blog '${objToUpdate.title}' has now ${objToUpdate.likes} Likes`,
        5,
        'success'
      ))

        
    }
    
}

export const deleteBlog = (blogToRemove, blogTitle) => {
    return async dispatch => {
        try {
            await blogService.remove(blogToRemove)        
            dispatch(removeBlog(blogToRemove))
            dispatch(setNotification(
                `Blog ${blogTitle} was removed`,
                5,
                'info'
        ))        
      
        } catch (error) {
            dispatch(setNotification(
            `${error.message}`,
            5,
            'danger'
        ))
        }   
    }
}

export const {
    setBlogs,
    appendBlog,
    addLikes,
    removeBlog
} = blogSlice.actions

export default blogSlice.reducer