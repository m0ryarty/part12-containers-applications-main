import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'


const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  

  const handleUserName = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)

  const newLogin = (event) => {
    event.preventDefault()
    const loginObj = { username, password }
    dispatch(loginUser(loginObj))
    
  }

  return (
    <div>
    <h2>Login</h2>
      <Form onSubmit={newLogin}>
        <Form.Group>          
        <Form.Label>Username:</Form.Label>          
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={handleUserName}
          id='username'
        />
     
      <Form.Group>
         <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
          id='password'
        />
      </Form.Group>

        </Form.Group>
      <Button style={{marginTop: '10px'}} id='login-button' type="submit">login</Button>
    </Form>    
    </div>
  )
}




export default LoginForm