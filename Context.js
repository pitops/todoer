import React, { useReducer } from 'react'
import AsyncStorage from './AsyncStorage'
import produce from 'immer'

const initialState = {
  todos: []
}

function dispatchMiddleware (dispatch) {
  return async (state, action) => {
    let todos
    switch (action.type) {
      case 'ADD_TODO':
        todos = [...state.todos, action.payload]
        await AsyncStorage.setItem('todos', todos)

        return dispatch(action)
      case 'DELETE_TODO':
        todos = [
          ...state.todos.filter(todo => todo.createdAt !== action.payload)
        ]
        await AsyncStorage.setItem('todos', todos)

        return dispatch(action)
      case 'TOGGLE_TODO':
        todos = produce(state.todos, draft => {
          draft.map(todo => {
            if (todo.createdAt === action.payload) {
              todo.isComplete = !todo.isComplete
            }
            return todo
          })
          return draft
        })

        await AsyncStorage.setItem('todos', todos)

        return dispatch(action)
      default:
        return dispatch(action)
    }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_TODOS':
      return { ...state, todos: action.payload }
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => todo.createdAt !== action.payload)
        ]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: produce(state.todos, draft => {
          draft.map(todo => {
            if (todo.createdAt === action.payload) {
              todo.isComplete = !todo.isComplete
            }
            return todo
          })
          return draft
        })
      }
    default:
      return state
  }
}

const TodosContext = React.createContext(initialState)

function TodosProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <TodosContext.Provider
      value={{ state, dispatch: dispatchMiddleware(dispatch) }}
    >
      {props.children}
    </TodosContext.Provider>
  )
}
export { TodosContext, TodosProvider }
