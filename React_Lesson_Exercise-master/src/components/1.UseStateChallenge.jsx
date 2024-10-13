import { useState } from "react";

export default function UseStateChallenge() {
  
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <main>
      <h1>useState Challenge</h1>
      
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide" : "Show"} BOO!
      </button>

      {isVisible && <div>BOO!</div>}
    </main>
  );
}

