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
      return [...oldTodos, {id: uuidV4(), text: action.payload.text.trim()}]; // add trimmed todo with unique id and text
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
  function handleAdd() {
    const cleanToDo = inputRef.current.value.trim();
    if(cleanToDo) {
      dispatch({type: 'ADD', payload: {text: cleanToDo}});
      inputRef.current.value = ''; // Clear the current input field
    }
    focusInput(); // UX: prompt to enter one or get ready to enter the next
  }
  function handleRemove(id) {
    dispatch({type: 'REMOVE', payload: { id }});
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
        <h2 className="high-title">To-do</h2>
        <input
          autoFocus
          className="high-title" 
          ref={inputRef} 
          placeholder="Add a new to-do" 
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <h3>{todo.text}</h3>
            <button onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
