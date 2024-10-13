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
}

export default function UseReducerChallenge() {
  const inputRef = useRef();

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button>Add</button>

        <ul>{/* To-do data... */}</ul>
      </div>
    </main>
  );
}
