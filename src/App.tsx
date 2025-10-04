import { useSelector, useDispatch } from 'react-redux'
import { Tooltip } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTaskIcon from '@mui/icons-material/AddTask';

import './App.css'

import { addTodo, submitTodoText, setCompleted, setIncomplete, deleteTodo } from './store/slices/todoSlice.ts'

function App() {
  const dispatch = useDispatch();
  const { text, todos } = useSelector((state:any) => state.todosData);

  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Very complicated todo list</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter todo"
                value={text} // value from Redux state
                onChange={(e) => dispatch(submitTodoText(e.target.value))}
              />
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => dispatch(addTodo())}
              >
                Add Todo
              </button>
            </div>
            <ul className="list-group">
              {
                todos.map((todo:any) => (
                  <div key={todo.id} className="list-group-item">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                      {todo.title}
                      <span className={`badge rounded-pill ${todo.completed ? 'bg-warning' : 'bg-primary'}`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div>
                      {
                        !todo.completed ? 
                        <Tooltip title='Mark as Complete'>
                          <button className="btn btn-sm btn-outline-secondary done-btn" 
                            onClick={() => dispatch(setCompleted(todo.id))}>
                              <TaskAltIcon />
                          </button>
                        </Tooltip> : 
                        <Tooltip title='Mark as Incomplete'>
                          <button className="btn btn-sm btn-outline-secondary done-btn" 
                            onClick={() => dispatch(setIncomplete(todo.id))}>
                              <AddTaskIcon />
                          </button>
                        </Tooltip>
                        }
                        <Tooltip title='Delete'>
                          <button className='btn btn-sm btn-outline-danger'
                            onClick={() => dispatch(deleteTodo(todo.id))}>
                            <DeleteForeverIcon />
                          </button>
                        </Tooltip>
                    </div>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
