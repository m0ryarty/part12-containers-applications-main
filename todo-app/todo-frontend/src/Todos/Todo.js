import axios from '../util/apiClient'
import { useEffect, useState } from "react"
import { useMatch } from 'react-router-dom'


const Todo = () => {const match = useMatch('/todos/:id')
  const [todo, setTodo] = useState('')

const todoId = match ? match.params.id : null

  useEffect(() => {
    const getTodo = async () => {
    const { data } = await axios.get(`/todos/${todoId}`)    
    setTodo(data)
  }
   getTodo()
  }, [ todoId ])

  return (
    <>
      <h1>{todo.text}</h1>
      <h3>{todo.done?'done':'not done'}</h3>
    </>
  )
  
}

export default Todo