/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.id, text: action.text }];
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []);

  function addTodo() {
    const text = inputRef.current.value.trim();
    if (!text) return;

    dispatch({ type: "ADD", id: uuidV4(), text });
    inputRef.current.value = "";
  }

  function removeTodo(id) {
    dispatch({ type: "REMOVE", id: id });
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <input ref={inputRef} placeholder="Add a new to-do" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(function(todo) {
          return (
            <li key={todo.id}>
              {todo.text}{" "}
              <button type = "button" onClick={function() { removeTodo(todo.id); }}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}