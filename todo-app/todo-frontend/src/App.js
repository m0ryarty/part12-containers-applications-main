
import './App.css';
import TodoView from './Todos/TodoView'
import { Route, Routes } from 'react-router-dom'
import Todo from './Todos/Todo';


const App = () => {
    

  return (
    <Routes >
      <Route path='/' element={<div className='App'><TodoView /></div>}/>
      <Route path='todos/:id' element={<Todo/>}/>      
    </Routes>
  );
}

export default App;
