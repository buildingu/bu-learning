import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; 

function todoReducer(state, action) {
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
  const [todos, dispatch] = useReducer(todoReducer, []); 
  const inputRef = useRef(); 

  const addTodo = () => {
    const todoText = inputRef.current.value;
    if (todoText.trim()) {
      dispatch({ type: "ADD_TODO", payload: todoText });
      inputRef.current.value = ""; 
    }
  };

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
