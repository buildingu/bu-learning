/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <main>
      <h1>useState Challenge</h1>
      
      <div className="toggle-container">
        <button 
          onClick={toggleVisibility}
          className="toggle-button"
        >
          {(() => {
            if (isVisible) {
              return "Hide BOO!";
            } 
            else {
              return "Show BOO!";
            }
          })()}
        </button>
        
        {isVisible && (
          <div className="boo-message">
            <h2>BOO!</h2>
          </div>
        )}
      </div>
    </main>
  );
}
