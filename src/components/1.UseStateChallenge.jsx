import { useState } from "react";

export default function UseStateChallenge() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleBoo = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={toggleBoo}>
        {isVisible ? "Hide" : "Show"} BOO!
      </button>
      {isVisible && <div>BOO!</div>}
    </main>
  );
}
