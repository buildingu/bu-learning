/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Generates unique IDs

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: action.payload.id, text: action.payload.text }];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

  // Function to add a new to-do
  const addTodo = () => {
    const text = inputRef.current.value.trim();
    if (text === "") return; // Prevent adding empty to-dos
    dispatch({ type: "ADD_TODO", payload: { id: uuidV4(), text } });
    inputRef.current.value = ""; // Clear input field after adding
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}