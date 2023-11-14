import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'


const NewBlog = () => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogObj = { title, author, url }
  const loggedUser = useSelector(state => state.login)
  

  const addBlog = async (event) => {
      event.preventDefault()
    dispatch(createBlog(blogObj, loggedUser))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitle = ({ target }) => setTitle(target.value)
  const handleAuthor = ({ target }) => setAuthor(target.value)
  const handleUrl = ({ target }) => setUrl(target.value)

  return (
    

      <Form onSubmit={addBlog}>
        <Form.Group>
            <Form.Label>Title:</Form.Label>      
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
            placeholder='Title'
            id='Title'
          />
        </Form.Group>
        <Form.Group>
            <Form.Label>Author:</Form.Label>      
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
            placeholder='Author'
            id='Author'
          />
        </Form.Group>
        <Form.Group>
           <Form.Label>URL:</Form.Label>       
          <Form.Control
            type="text"
            value={url}
            name="URL"
            onChange={handleUrl}
            placeholder='URL'
            id='URL'
          />
        </Form.Group>
        
          <Button style={{marginTop:'10px'}} id='newBlog' type="submit">Create</Button>
        
      </Form>
    
  )
}

export default NewBlog