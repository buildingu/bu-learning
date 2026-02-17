/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
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
      {isVisible && <div style={{ marginTop: '20px' }}>BOO!</div>}

    </main>
  );
}