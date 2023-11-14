import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  
  Routes, Route, Navigate
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { keepUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'


import AllBlogs from './components/AllBlogs'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Comments from './components/Comments'


const App = () => { 
  const loggedUser = useSelector(state => state.login)
   
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(keepUser(user))
    }   
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])
 
    return (
      <div  className = 'container'>        
        <Navigation />
        <div>
          <Notification/>
        </div>
          
        <Routes>
          
          <Route path='/users/:id' element={<User/>} />
          <Route path='/blog/:id' element={ 
            <>
            <Blog/>
              <Comments />
          </> } />
          <Route path='/blogs'
            element={ <>                        
              <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                <NewBlog />
              </Togglable>
              <AllBlogs />           

            </>} />
          <Route path='/users' element={
            <>                       
            <Users/>          
            </>
          } />
          
          <Route path='/' element={!loggedUser ?  <LoginForm />: <Navigate replace to= '/blogs'/>} />
                  
        
        </Routes>
    </div>
  )
}

export default App