import { useSelector, useDispatch } from 'react-redux'
import { Tooltip } from '@mui/material'
import { useState } from 'react';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditSquareIcon from '@mui/icons-material/EditSquare';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import './App.css'

import { addTodo, submitTodoText, setCompleted, setIncomplete, editTodo, deleteTodo } from './store/slices/todoSlice.ts'

function App() {
  const [open, setOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  const handleOpen = (todo:any) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.title);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { text, todos } = useSelector((state:any) => state.todosData);

  const handleSaveEdit = () => {
    dispatch(editTodo({id: editTodoId, title: editTodoText}));
    setOpen(false);
  };

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
                        <Tooltip title='Mark as Completed'>
                          <button className="btn btn-sm btn-outline-secondary me-2" 
                            onClick={() => dispatch(setCompleted(todo.id))}>
                              <TaskAltIcon />
                          </button>
                        </Tooltip> : 
                        <Tooltip title='Mark as Incomplete'>
                          <button className="btn btn-sm btn-outline-secondary me-2" 
                            onClick={() => dispatch(setIncomplete(todo.id))}>
                              <AddTaskIcon />
                          </button>
                        </Tooltip>
                      }

                      <Tooltip title='Edit'>
                        <button className='btn btn-sm btn-outline-success me-2'
                          onClick={() => handleOpen(todo)}>
                          <EditSquareIcon />
                        </button>
                      </Tooltip>

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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 id="modal-modal-title">Edit Todo</h2>
              <div className='row'>
                <div className='col-md-12'>
                  <input type="text" 
                    className='form-control' 
                    value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                    />
                  <button className='btn btn-primary btn-sm mt-3' onClick={handleSaveEdit}>Save Changes</button>
                </div>
              </div>
            </Box>
          </Modal>

        </div>
      </div>
    </>
  )
}

export default App
