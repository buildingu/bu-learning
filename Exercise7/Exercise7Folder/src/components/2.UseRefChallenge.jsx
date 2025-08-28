/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef } from "react";

export default function UseRefChallenge() {
  // to reference the <input> element
  const inputBoxReference = useRef(null);

  // when called, focus on the input field
  const focusInput = () => {
    inputBoxReference.current.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>
      {/* Input and button... */}
      {/* ref is inputBoxReference */}
      <input ref={inputBoxReference} placeholder="Input Box"></input>
      <br />
      <br />
      {/* when the button is clicked, call on the function that focuses on the input box */}
      <button onClick={focusInput}>Focus</button>
    </main>
  );
}
