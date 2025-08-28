/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  const input = useRef(null);

  const focusInput = () => {
    input.current.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>
      <input 
        ref={input}
        type="text" 
        placeholder="Type here.. if you so choose..."
      />
      <button onClick={focusInput}>Focus</button>
    </main>
  );
}
