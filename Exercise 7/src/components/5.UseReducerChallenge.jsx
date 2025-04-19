/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  // Create actions (add and remove) here...
  switch (action.type) {
    case "add":
      return [...state, { id: uuidV4(), text: action.text }];
    case "remove":
      const newtd = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.id) {
          newtd.push(state[i]);
        }
      }
      return newtd;
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = () => {
    const text = inputRef.current.value;
    if(text){
      dispatch({type: "add", text});
      inputRef.current.value = "";
    }
  }

  const removeTodo = (id) => {
    dispatch({type: "remove", id})
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button style={{margin: '30px'}} onClick={addTodo}>Add</button>

        <ul>
          {
            todos.map(todo =>
              <li key={todo.id}>{todo.text}
              <button style={{margin: '30px'}} onClick={() => dispatch({type: "remove", id: todo.id})}>Remove todo</button>
              </li>
            )
          }
        </ul>
      </div>
    </main>
  );
}
