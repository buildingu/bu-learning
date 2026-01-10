/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: uuidV4(), text: action.payload }
      ];

    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

  function addTodo() {
    const value = inputRef.current.value.trim();
    if (!value) return;

    dispatch({ type: "ADD", payload: value });
    inputRef.current.value = "";
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>

      <div>
        <h2>To-do</h2>

        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() =>
                dispatch({ type: "REMOVE", payload: todo.id })
              }>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
