import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from "./reducers/notificationReducer"
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer,
        users: usersReducer,
        comments: commentsReducer
    }
})



export default store