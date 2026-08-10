/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.

function todoReducer(state, action) {
  if (action.type === "ADD-TODO") {
    return [...state, { id: uuidV4(), text: action.payload }];
  } else if (action.type === "REMOVE-TODO") {
    return state.filter(todo => todo.id !== action.payload);
  } else {
    return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const AddTodo = () => {
    const text = inputRef.current.value;
    if (text) {
      dispatch({ type: "ADD-TODO", payload: text });
      inputRef.current.value = "";
    }
  };
  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={AddTodo}>Add</button>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => dispatch({type: "REMOVE-TODO", payload: todo.id })}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
