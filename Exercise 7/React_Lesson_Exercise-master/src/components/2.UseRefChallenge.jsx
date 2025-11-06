/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <main>
      <h1>useRef Challenge</h1>
      <label htmlFor="input">Enter text: </label>
      <input 
        id = "input"
        ref = {inputRef}
        placeholder = "Type something..."
      />
      <button type = "button" onClick={focusInput}>Focus</button>
    </main>
  );
}