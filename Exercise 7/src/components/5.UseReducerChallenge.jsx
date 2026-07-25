/**
 * Challenge 4: useReducer
 *
 * Description:
 * Create a simple to-do list with useReducer for managing the to-do state. You should be able to add and remove to-dos.
 */

import { useReducer, useRef, useState } from "react";
import { v4 as uuidV4, v4 } from "uuid"; // Use the uuid for a unique identifier for each todo.

const TODO_ACTIONS = {
  ADD: "add-todo",
  REMOVE: "remove-todo",
};

function todoReducer(todos, action) {
  // Create actions (add and remove) here...
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return [...todos, newTodo(action.payload.todoName)];
    case TODO_ACTIONS.REMOVE:
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

function newTodo(todoName) {
  return { id: uuidV4(), name: todoName };
}

export default function UseReducerChallenge() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [todoName, setTodoName] = useState("");

  function handleAddTodo() {
    if (!todoName) return;
    dispatch({ type: TODO_ACTIONS.ADD, payload: { todoName: todoName } });
    setTodoName("");
  }

  return (
    <main>
      <h1>useReducer Challenge</h1>
      <div>
        <h2>To-do</h2>
        <input
          ref={inputRef}
          placeholder="Add a new to-do"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>

        <ul>
          {
            /* To-do data... */
            todos.map((todo) => (
              <li key={todo.id}>
                {todo.name}{" "}
                <button onClick={() => dispatch({ type: TODO_ACTIONS.REMOVE, payload: { id: todo.id } })}>
                  Delete
                </button>{" "}
              </li>
            ))
          }
        </ul>
      </div>
    </main>
  );
}
