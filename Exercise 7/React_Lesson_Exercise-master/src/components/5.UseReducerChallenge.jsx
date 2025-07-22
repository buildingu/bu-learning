/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.

function todoReducer(state, action) {
  // Create actions (add and remove) here...
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: uuidV4(), text: action.payload }];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []);

  const handelAdd = () => {
    const value = inputRef.current.value.trim();
    if (value) {
      dispatch({ type: "ADD_TODO", payload: value });
      inputRef.current.value = "";
    }
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handelAdd}>Add</button>

        <ul>{/* To-do data... */
          todos.map((todo) => (
            <li key={todo.id}> 
            {todo.text} <button onClick={() => dispatch({type: "REMOVE_TODO", payload: todo.id})}>X</button></li>))
        }
        </ul>
      </div>
    </main>
  );
}
