/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [boo, setboo] = useState(false);
  return (
    <main>
      <h1>useState Challenge</h1>
      {boo && <div>BOO!</div>}
      <button onClick={() => setboo(!boo)}>Scary Button</button>
    </main>
  );
}
