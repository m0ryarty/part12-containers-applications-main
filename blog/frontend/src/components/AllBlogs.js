import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Button, ListGroup } from 'react-bootstrap'
  
  
const AllBlogs = () => {  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.login)

    

  const removeBlog = async (blogId, blogTitle) => {
    if (window.confirm(`Remove blog ${blogTitle} ?`)) {
      dispatch(deleteBlog(blogId, blogTitle))
    }
  }


  return (
    <ListGroup style={{ marginTop: '10px' }}>
      <h2>Blogs</h2>
      {
       blogs.map(blog =>
        blog.user.map(
          user => {
            return (              
              <ListGroup.Item  key={blog.id} >
                <Link style={{textDecoration:'none'}} to={`/blog/${blog.id}`}>{blog.title} by {blog.author}</Link>              
                {(user.username === loggedUser.username) && <Button style={{marginLeft: '10px'}} id='remove' onClick={() => removeBlog(blog.id, blog.title)}>Remove</Button>}
              
              </ListGroup.Item>
            )
          }
        )) 
      }
    </ListGroup>

  )

}

export default AllBlogs