/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
/* === Main Reducer State handler function === */
function todoReducer(oldTodos, action) {
  // Todo action logic (type based)
  switch(action.type) {
    case 'ADD':
      return [...oldTodos, {id: uuidV4(), text: action.payload.text}]; // add todo with unique id and text
    case 'REMOVE':
      return oldTodos.filter(todo => todo.id !== action.payload.id); // remove todo with unique id
    default:
      return oldTodos;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []); // set up reducer (initial state: no tasks)

  /* === Utility functions === */
  function focusInput() {
    inputRef.current.focus();
  }
  /* === useReducer Dispatch functions === */
  function handleAdd(todo) {
    if(inputRef.current.value === null || (inputRef.current.value === '' || inputRef.current.value === undefined)) {
      focusInput(); // Focus on the input field if it's empty (prompt to enter one)
    } else {
      dispatch({type: 'ADD', payload: {id: uuidV4(), text: inputRef.current.value}});
      inputRef.current.value = ''; // Clear the current input field
    }
  }
  function handleRemove(todo) {
    dispatch({type: 'REMOVE', payload: {id: todo.id}});
  }
  /* === Event handlers === */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  return (
    <main>
      <h1 className="high-title">useReducer Challenge</h1>
      <form onSubmit={handleSubmit}>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" className="text-field"/>
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <h3>{todo.text}</h3>
            <button onClick={() => handleRemove(todo)}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
