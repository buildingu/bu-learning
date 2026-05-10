import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

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
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

  const handleAdd = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    dispatch({ type: "ADD", payload: text });
    inputRef.current.value = "";
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAdd}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}{" "}
              <button onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
