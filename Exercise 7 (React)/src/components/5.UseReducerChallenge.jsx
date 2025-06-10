/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4, v4 } from "uuid"; // Use the uuid for a unique identifier for each todo.

function todoReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return {
        toDoList: state.toDoList.filter((todo) => todo.id !== action.payload),
      };
    case "ADD":
      return {
        toDoList: [
          ...state.toDoList,
          {
            id: uuidV4(),
            text: action.payload,
          },
        ]
      };
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(todoReducer, { toDoList: [] });

  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (value) {
      dispatch({ type: "ADD", payload: value });
      inputRef.current.value = "";
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAdd}>Add</button>

        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {state.toDoList.map((toDo) => (
            <li key={toDo.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3px",
              padding: "0.5rem",
            }}>
              {toDo.text}
              <button onClick={() => handleDelete(toDo.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
