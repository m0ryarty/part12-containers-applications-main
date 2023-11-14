import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
 
const Head = () => {
  const loggedUser = useSelector(state => state.login)  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logoutUser())
    navigate('/')
  }
  
  return (
    <>
     
      <p>{loggedUser.name} is logged in <Button onClick={handleLogout} >Logout</Button></p>
    </>

  )}


export default Head