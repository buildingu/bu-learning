/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  /* Empty Reference Declaration */
  const inputRef = useRef(null);
  /* Function to focus on the input field using defined reference field */
  function focusInput() {
    inputRef.current.focus();
  }
  /* Main JSX Component implementing functions defined above */
  return (
    <main>
      <h1>useRef Challenge</h1>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </main>
  );
}
