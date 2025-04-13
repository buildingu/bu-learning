/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleButton = () => {
    setIsVisible(!isVisible);
  };

    return (
      <main>
        <h1>useState Challenge</h1>
        <div>
          <button onClick={toggleButton}>
            {isVisible ? 'Hide' : 'Show'}
          </button>
          {isVisible && <div style={{ marginTop: '10px' }}>BOO!</div>}
        </div>
      </main>
    );
}
