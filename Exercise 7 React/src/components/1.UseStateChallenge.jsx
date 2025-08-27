/**
 * Challenge 1: useState
 *
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`
 * The button should toggle the visibility of the div. - EXERCISE 7- UseStateChallenge done
 */
 

import { useState } from "react";

export default function UseStateChallenge() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <div>BOO!</div>}
    </main>
  );
}
