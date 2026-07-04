/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  if (action.type === "ADD_TODO") {
    return [...state, { id: uuidV4(), text: action.payload }];
  } else if (action.type === "REMOVE_TODO") {
    return state.filter((todo) => todo.id !== action.payload);
  } else {
    return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []);
  

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={() => {
          const text = inputRef.current.value;
          if (text) {
            dispatch({ type: "ADD_TODO", payload: text });
            inputRef.current.value = "";
          }
        }}>
          Add
        </button>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
