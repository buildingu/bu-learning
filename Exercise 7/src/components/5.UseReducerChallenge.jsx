/**
 * Challenge 5: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(state, action) {
  switch(action.type){
    case 'add':
      return [
        ...state,
        {
          id:uuidV4(),
          text: action.text,
          completed: false
        }
      ];
    case 'remove':
      return state.filter(todo => todo.id !== action.id);

    default:
      return state;
  }
}


export default function UseReducerChallenge() {
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todoReducer,[]);

  const handleAddToDo = () => { 
    const todoText = inputRef.current.value.trim();
    if(todoText) {
      dispatch({type:'add', text: todoText});
      inputRef.current.value = "";
    }
  };

  const handleRemoveToDo = (id) => {
    dispatch({type: 'remove', id})
  };

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={handleAddToDo}>Add</button>

        <ul>{todos.map(todo => (
          <li key={todo.id}>
            <div>
              <span >{todo.text}</span>
            </div>
            <button onClick={() => handleRemoveToDo(todo.id)} style={{padding: '8px'}}>Remove</button>
          </li>
        ))}
        </ul>
      </div>
    </main>
  );
}
