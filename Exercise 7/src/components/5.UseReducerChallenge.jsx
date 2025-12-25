/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid"; // Use the uuid for a unique identifier for each todo.
 
function todoReducer(todos, action) {
  switch (action.type) {
    case "addTodo":
      return [...todos, newTodo(action.payload.text)];
    case "toggleTodo":
      return todos.map((todo) =>
        todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo
      );
    case "removeTodo":
      return todos.filter((todo) => todo.id !== action.payload);  
    default:
      return todos;
  }
}

function newTodo(text) {
  return { id: uuidV4(), text: text, complete: false };
}

export default function UseReducerChallenge() {
  const inputRef = useRef(null);
  const [todos, dispatch] = useReducer(todoReducer, [])

  function addTodo() {
    const text = inputRef.current?.value.trim();
    if (!text) return;
    dispatch({ type: "addTodo", payload: { text } });
    inputRef.current.value = "";
  }

  function toggleTodo(id) {
    dispatch({type: "toggleTodo", payload: id})
  }


  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input ref={inputRef} placeholder="Add a new to-do" />
        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.text}</span>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => dispatch({ type: 'removeTodo', payload: todo.id })}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
