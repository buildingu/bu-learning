/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {

  // Create a ref for the input field.
  const inputRef = useRef(null);

  // Function to focus on the input field.
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>

      <div className="useRef-Container">
        {/* Input field with ref of inputRef*/}
        <input ref={inputRef} type="text" placeholder="Type something..." />
        {/* This button calls our handleFocus function. */}
        <button onClick={handleFocus}>Focus</button>
      </div>
    </main>
  );
}

