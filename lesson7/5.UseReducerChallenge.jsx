/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. 
 * You should be able to add and remove to-dos.
 */
import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todo_reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const input_ref = useRef();
  const [todos, dispatch] = useReducer(todo_reducer, []);
  const add_input = () => {
    const text = input_ref.current.value;
    const new_todo = { id: uuidV4(), text }; 
    dispatch({ type: 'add', payload: new_todo });
    input_ref.current.value = ""; 
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={input_ref} placeholder="Add a new to-do" />
        <button onClick={add_input}>Add</button>        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => dispatch({ type: 'remove', payload: todo.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
