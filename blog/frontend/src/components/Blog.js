import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { updateLike } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Card, Button , Spinner} from "react-bootstrap"


const Blog = () => {
    
    const blogs = useSelector(state => state.blogs)
    const match = useMatch('/blog/:id')
  const dispatch = useDispatch()

    if (!blogs[0]) {
        
        return <Spinner animation="border" variant="primary" />
    }
    
    const blogToView = blogs.find(blog => blog.id === match.params.id)
    
  return (




    
      
      <Card>
      <Card.Header as="h5">{blogToView.title} by {blogToView.author}</Card.Header>
      <Card.Body>
          <Card.Title><a href={blogToView.url}>{blogToView.url}</a></Card.Title>
          
        {blogToView.user.map(user => {
              return (<div key={user.id}>
              <Card.Text key={user.id}>{blogToView.likes} Likes<Button
                    style={{ marginLeft: '8px' }}
                    onClick={                      
                      () => dispatch(updateLike(blogToView, user)                        
                      )}>like</Button></Card.Text>
              <Card.Text>Added by {user.name }</Card.Text>
              </div>)
          }
          )}

        <Card.Text>         
        </Card.Text>
      </Card.Body>
    </Card>
    
  )
}

export default Blog