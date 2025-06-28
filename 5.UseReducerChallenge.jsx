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
  switch (action.type){
    case "add": 
      return[...state, action.payload];
    case "remove":
      return state.filter(todo => todo.id !== action.payload);
    
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(todoReducer, [])

  function handleAdd(){
    const input = inputRef.current.value
    dispatch({type: "add",
      payload: {
        id: uuidV4(),
        text: input

      }
    })
    inputRef.current.value === "";

  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAdd}>Add</button>

        <ul>{state.map((item)=>(
          <li key = {item.id} >{item.text} {
            <button onClick={()=> dispatch({type: "remove", 
              payload: item.id
            })}>Remove</button>
          }</li>
        ))}</ul>
      </div>
    </main>
  );
}
