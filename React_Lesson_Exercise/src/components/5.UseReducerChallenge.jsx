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
      return [...state, {id: uuidV4(), text: action.text}]
    case "remove":
      const newToDoList = []
      state.map(task => {
        if (task.id != action.id) {
          newToDoList.push(task)
        }
      })
    
      return newToDoList
    default:
      return state
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [toDoList, dispatch] = useReducer(todoReducer, [])
  

  const addTask = () => {
    const text = inputRef.current.value

    if (text) {
      dispatch({ type: "add", text })
      inputRef.current.value = ""
    }
  }

  const removeTask = (id) => {
    dispatch({ type: "remove", id })
  }
  

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={addTask}>Add</button>

        <ul>
          {toDoList.map(task => 
            <>
              <li key={task.id}>{task.text}</li>
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </>
          )}
        </ul>
      </div>
    </main>
  );
}