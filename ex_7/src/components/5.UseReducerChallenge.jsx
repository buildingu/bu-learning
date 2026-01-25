/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  switch(action.type) {

    case "ADD_TODO":
      return [
        ...state,
        {id: uuidV4(), text: action.payload}
      ];

    case "REMOVE_TODO":
      return state.filter(
        todo => todo.id !== action.payload
      );

    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [tasks, dispatch] = useReducer(todoReducer,[])

  function addItem() {
    const val = inputRef.current.value.trim();
    if (val) {
      dispatch({type: "ADD_TODO", payload:val})
      inputRef.current.value = "";
    }
  }

  function removeItem(id) {
    dispatch({type: "REMOVE_TODO", payload:id})
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>

      <div>
        <h2>To-do</h2>

        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={()=>addItem()}>Add</button>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.text}
              <button onClick={()=>removeItem(task.id)}> done </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
