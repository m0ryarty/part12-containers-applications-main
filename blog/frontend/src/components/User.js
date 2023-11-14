import {useMatch } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ListGroup } from "react-bootstrap"
import { Spinner } from "react-bootstrap"

const User = () => {
  
  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  
  if (!users[0]) {    
    return <Spinner animation="border" variant="primary" />
  }

  const userBlogs = users.find(n => n.id === match.params.id)
  
  return (
    <>
      <h2>Blogs added by {userBlogs.name }</h2>
    
    <ListGroup>
      {        
          userBlogs.blogs.map(blogs =>
          
          <ListGroup.Item key={blogs.id}><Link to={`/blog/${blogs.id}`}>{blogs.title} by {blogs.author}</Link></ListGroup.Item>)      
      }        
    </ListGroup>
    </>
  )
}

export default User