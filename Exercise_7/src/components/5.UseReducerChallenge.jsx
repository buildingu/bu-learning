/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: uuidV4(),
          text: action.payload
        }
      ];
    
    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);
    
    default:
      return state;
  }
}

export default function UseReducerChallenge() {
  const inputRef = useRef();
  
  const [todos, dispatch] = useReducer(todoReducer, []);

  const add = () => {
    const todoText = inputRef.current.value.trim();
    
    if (todoText) {
      dispatch({ type: "ADD", payload: todoText });
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const enter = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input 
          ref={inputRef} 
          placeholder="Add a new to-do"
          onKeyPress={enter}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={add}>Add</button>

        <ul style={{ textAlign: 'left', marginTop: '20px' }}>
          {todos.length === 0 ? (
            <p>No todos yet. Add one above!</p>
          ) : (
            todos.map(todo => (
              <li 
                key={todo.id}
                style={{
                  padding: '10px',
                  backgroundColor: '#c0440b',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{todo.text}</span>
                <button 
                  onClick={() => remove(todo.id)}
                  style={{
                    backgroundColor: '#ff0015',
                    padding: '5px 10px'
                  }}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}