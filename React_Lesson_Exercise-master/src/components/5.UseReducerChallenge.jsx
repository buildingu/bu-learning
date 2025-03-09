/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

// Reducer function to manage the to-do list state.
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: uuidV4(), text: action.payload }];
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  // useReducer hook to manage the to-do list state.
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

    // Function to handle adding a new to-do.
  const handleAdd = () => {
    if (inputRef.current.value.trim() === "") return;
    dispatch({ type: "ADD", payload: inputRef.current.value });
    inputRef.current.value = "";
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <div className="useReducer-add-wrapper">
          <input ref={inputRef} placeholder="Add a new to-do" />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul className="useReducer-ul-wrapper"> 
          {/* Mapping through the to-do list and rendering each item */}
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className="useReducer-list-wrapper">
                {todo.text}
                
                {/* Remove button to dispatch a REMOVE action.*/}
                <button onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
