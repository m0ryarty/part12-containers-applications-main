import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import Head from "./Head"

const padding = {
  padding: 5,
  textDecoration:'none'
}
  
const Navigation = () => {
    const loggedUser = useSelector(state => state.login)

  return (
    <div>
          {loggedUser
              ?
              <div style={{display:'flex', flexFlow: 'row', alignItems: 'baseline'}} >
                 <div>
                    <Link  style={padding} to='blogs'>Blogs</Link>
                    <Link style={padding} to='users'>Users</Link>
                </div>
                <div>
                    <Head/>                      
                </div>                  
              </div>
            :<Link style={padding} to='/'></Link>
          }
        </div>
  )
}

export default Navigation