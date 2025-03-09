/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";


export default function UseStateChallenge() {

  // Initializing useState with a boolean value of false.
  const [isHidden, setIsHidden] = useState(false);

  return (
    <main>
      <h1>useState Challenge</h1>

      {/* Button to toggle the visibility of the div containing the text `BOO!` */}
      <button onClick={() => setIsHidden(!isHidden)}>
        {/* Switch the text of the button based on state. */}
        {isHidden ? "Show BOO!" : "Hide BOO!"}
      </button>
      {/* Text that we are conditionally rendering: */}
      {!isHidden && <div>BOO!</div>}
    </main>
  );
}
