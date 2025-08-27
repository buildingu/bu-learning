/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". 
 * When the button is clicked, use useRef to focus on the input field.
 * - EXERCISE 7- UseRefChallenge done
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <main>
      <h1>useRef Challenge</h1>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus</button>
    </main>
  );
}
