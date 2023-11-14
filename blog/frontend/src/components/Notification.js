import { useSelector } from 'react-redux'
import{Alert} from 'react-bootstrap'


const Notification = () => {
  
  const notification = useSelector(state => {    
    return state.notification   
  }) 
const variant = notification.background 
  return (
    <Alert variant={variant}
      style={{
      display: notification.display
    }}>
      {notification.message}
    </Alert>
  )
}

export default Notification