/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { useRef,useState } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(0);
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    if (isFocused) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
    setIsFocused(!isFocused);
  }
  return (
    <main>
      <h1>useRef Challenge</h1>
      {/* Input and button... */
        <div>
          <input ref={inputRef} type="text" placeholder="enter your text"></input>
          <button onClick={toggleFocus}>Toggle Focus</button>
        </div>}
    </main>
  );
}
