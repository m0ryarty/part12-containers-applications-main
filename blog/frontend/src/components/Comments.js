import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {initializeComments, createComment} from '../reducers/commentsReducer'
import { useMatch } from "react-router-dom"
import blogService from '../services/blogs'
import { ListGroup, Button, InputGroup, Form, Spinner } from "react-bootstrap"


const Comments = () => {

  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const loggedUser = useSelector(state => state.login)
  const users = useSelector(state=>state.users)
  const match = useMatch('/blog/:id')
  const id = match.params.id
  const [ comment, setComment ] = useState('')
  
  const handleNewComment = ({ target }) => setComment(target.value)
 
  const newComment = (event) => {
    event.preventDefault()    
    dispatch(createComment(comment, id))
    setComment('')
  }
  

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')   
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)      
      blogService.setToken(user.token)     
    }
    
    dispatch(initializeComments(id, loggedUser))
    
  }, [ id, dispatch, loggedUser ])
  
 if (!users[0]) {
        
        return <Spinner animation="border" variant="primary" />
    }

  return (
    <div style={{marginTop:'25px'}}>
      <h4>Comments</h4>
    <Form onSubmit={newComment}>
        
         <InputGroup className="mb-3">
        <Form.Control
          placeholder="Comment"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          type="text"
          value={comment}
          name="Comment"
          onChange={handleNewComment}
          id='comment'
              
        />
        <Button type= 'submit' variant="primary" id="button-addon2">
          Add
        </Button>
      </InputGroup>       
       
           
      </Form>


    <ListGroup>
      {
          comments.map(comment => {           
            const commentUser = users.find(user=>user.id === comment.user[0] )
            return <ListGroup.Item key={comment.id} >'{comment.comment}' by {commentUser.name }</ListGroup.Item>
          })
    }
    </ListGroup>    
    </div>
  )
}

export default Comments