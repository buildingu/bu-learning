/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  switch(action.type) {
  case "ADD-TODO":
    return [
      ...state,
      { id: uuidV4(), text: action.payload.text, completed: false }
    ];
  case "REMOVE-TODO":
    return state.filter((todo) => todo.id !== action.payload.id);
  default:
    return state;}
}

export default function UseReducerChallenge() {
  const inputRef = useRef();

  const [todos, dispatch] = useReducer(todoReducer, []);

  const handleAdd = () => {
    const addText = inputRef.current.value;
    if (addText) {
      dispatch({ type: "ADD-TODO", payload: {text : addText}});
    }}

  const handleRemove = () => {
    dispatch({ type: "REMOVE-TODO", payload: {id}});
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAdd}>Add</button>

        <ul>{todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleRemove(todo.id)}>Remove</button>
            </li>
          ))}</ul>
      </div>
    </main>
  );
}
