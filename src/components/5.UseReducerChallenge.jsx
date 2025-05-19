import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // For generating unique IDs for each to-do

// Step 1: Define the reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: uuidV4(), text: action.payload, completed: false },
      ];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const inputRef = useRef();

  // Step 2: Add a to-do
  const addTodo = () => {
    const text = inputRef.current.value;
    if (text) {
      dispatch({ type: "ADD_TODO", payload: text });
      inputRef.current.value = ""; // Clear the input field
    }
  };

  // Step 3: Remove a to-do
  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={addTodo}>Add</button>

        <ul>
          {/* Step 4: Render to-do list */}
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
