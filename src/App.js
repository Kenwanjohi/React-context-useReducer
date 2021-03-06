import React, {useState} from 'react';
import uuid from 'uuid/v4';
import {useFilterState, useFilterDispatch, useTodosDispatch, useTodosState} from './context/context'

function App() {
  const todos = useTodosState()
  const dispatchTodos = useTodosDispatch()
  const filter = useFilterState()
  const dispatchFilter = useFilterDispatch()
  const [task, setTask] = useState('');
  const handleChangeInput = event => {
    setTask(event.target.value);
  };
  const handleChangeCheckbox = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });
  };
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };
 
  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  };
 
  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' });
  };
 
  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }
 
    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }
 
    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }
 
    return false;
  });

  const handleSubmit = event => {
    if (task) {
      dispatchTodos({ type: 'ADD_TODO', task, id: uuid() });
    }
 
    setTask('');
 
    event.preventDefault();
  };

  return (
    
    <div className="App">
      <div>
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
