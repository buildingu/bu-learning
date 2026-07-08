/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);
  return (
    <main>
      <h1>useRef Challenge</h1>
      <input
      type="text"
      ref={inputRef}
      />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </main>
  );
}
