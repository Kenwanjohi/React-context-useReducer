import React from 'react'
import uuid from 'uuid/v4';
const filterDispatchContext=React.createContext()
const filterStateContext = React.createContext()
const todosStateContext = React.createContext()
const todosDispatchContext = React.createContext()

const initialTodos = [
    {
      id: uuid(),
      task: 'Learn React',
      complete: true,
    },
    {
      id: uuid(),
      task: 'Learn Firebase',
      complete: true,
    },
    {
      id: uuid(),
      task: 'Learn GraphQL',
      complete: true,
    },
  ];
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'DO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, complete: true };
          } else {
            return todo;
          }
        });
      case 'UNDO_TODO':
        return state.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, complete: false };
          } else {
            return todo;
          }
        });
      case 'ADD_TODO':
        return state.concat({
          task: action.task,
          id: action.id,
          complete: false,
        });
      default:
        throw new Error();
    }
  };

const TodosProvider = ({children}) => {
    const [todos, dispatchTodos] = React.useReducer(todoReducer, initialTodos);
    return (
      <todosStateContext.Provider value={todos}>
        <todosDispatchContext.Provider value={dispatchTodos}>
          {children}
        </todosDispatchContext.Provider>
      </todosStateContext.Provider>
    )
    
}

function useTodosState () {
  const context = React.useContext(todosStateContext)
  if(context === undefined) {
      throw new Error('useTodosState must be used within a TodosProvider')
  }
  return context
}
function useTodosDispatch () {
  const context = React.useContext(todosDispatchContext)
  if(context === undefined) {
      throw new Error('useTodosDispatch must be used within a TodosProvider')
  }
  return context
}

const filterReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_ALL':
        return 'ALL';
      case 'SHOW_COMPLETE':
        return 'COMPLETE';
      case 'SHOW_INCOMPLETE':
        return 'INCOMPLETE';
      default:
        throw new Error();
    }
  };

const FilterProvider = ({children}) => {
    const [filter, dispatchFilter] = React.useReducer(filterReducer, 'ALL');
    return(
    <filterStateContext.Provider value={filter} >
        <filterDispatchContext.Provider value={dispatchFilter} >
            {children}
        </filterDispatchContext.Provider>
    </filterStateContext.Provider>    
    )
}

function useFilterState () {
    const context = React.useContext(filterStateContext)
    if(context === undefined) {
        throw new Error('useFilterState must be used within a FilterProvider')
    }
    return context
}
function useFilterDispatch () {
    const context = React.useContext(filterDispatchContext)
    if(context === undefined) {
        throw new Error('useFilterDispatch must be used within a FilterProvider')
    }
    return context
}

export{TodosProvider,
  useTodosState,
  useTodosDispatch,
  FilterProvider,
  useFilterState,
  useFilterDispatch}