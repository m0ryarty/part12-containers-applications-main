import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const Users = () => {   
    const users = useSelector(state => state.users)   

  return (
      <>
          <h2>Users</h2>

          <Table striped bordered hover size="sm">
              <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs</th>
                </tr>                  
              </thead>
              <tbody>
                  {
                  users.map(user =>
                <tr key={user.name}>  
                  <td> <Link style={{textDecoration:'none'}} to={`/users/${user.id}`} >{user.username}</Link></td>
                  <td> {user.blogs.length} </td>
                </tr>)
                  }
              </tbody>
      
             
          </Table>

          
      </>
  )
}

export default Users