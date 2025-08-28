/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(todos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todos, { id: action.payload.id, text: action.payload.text }];
    case 'REMOVE_TODO':
      return todos.filter(function(todo) {
        return todo.id !== action.payload;
      });
    default:
      return todos;
  }
}

export default function UseReducerChallenge() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

  function addTodo() {
    const text = inputRef.current.value.trim();
    if (text) {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: uuidV4(), text }
      });
      inputRef.current.value = '';
    }
  }

  function removeTodo(id) {
    dispatch({
      type: 'REMOVE_TODO',
      payload: id
    });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input 
          ref={inputRef} 
          placeholder="Add a to-do" 
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map(function(todo) {
            return (
              <li key={todo.id}>
                {todo.text}
                <button onClick={function() { removeTodo(todo.id); }}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
