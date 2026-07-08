/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { id: action.payload.id, text: action.payload.text}];
    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []);
  const handleAddTodo = () => {
    const todoText = inputRef.current.value.trim();

    if (todoText !== "") {
      dispatch({
        type: "ADD",
        payload: { id: uuidV4(), text: todoText}
      });
      inputRef.current.value = "";
    }
  };
  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAddTodo}>Add</button>

        <ul>{todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch({type: "REMOVE", payload: todo.id })}>Remove</button>
          </li>
        ))}</ul>
      </div>
    </main>
  );
}
