/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.

// state and action are sent from React
// state: current state / todo array
// action: the object passed into dispatch {type,payload}
function todoReducer(state, action) {
  // Create actions (add and remove) here...
  switch (action.type) {
    case "add":
      // copy all todos into a new array and create the new to-do with an id and name
      return [...state, { id: uuidV4(), name: action.payload }];
    case "remove":
      // use filter to return a new array excluding the todo that is to be removed
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  // initialize the to-do state as an empty array
  // dispatch will send the actions to the todoReducer function
  const [todos, dispatch] = useReducer(todoReducer, []);

  const add = () => {
    // trim to remove extra white space
    const inputValue = inputRef.current.value.trim();
    // prevent an empty to-do list
    if (!inputValue) {
      return;
    }

    // call dispatch with an object containing add and the text from the user
    dispatch({ type: "add", payload: inputValue });

    // after, reset the input to blank
    inputRef.current.value = "";
  };

  const remove = (id) => {
    // call dispatch with an object containing remove and the id to be removed
    dispatch({ type: "remove", payload: id });
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={add}>Add</button>
        <ul>
          {/* To-do data... */}
          {/* loop over each to-do */}
          {todos.map((todo) => (
            // create a list item for each to-do
            <li key={todo.id}>
              {/* show the to-do */}
              {todo.name} <br />
              {/* create the remove button */}
              <button onClick={() => remove(todo.id)}>Remove</button>
              <br /> <br />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
