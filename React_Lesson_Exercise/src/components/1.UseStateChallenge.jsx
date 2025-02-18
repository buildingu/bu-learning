/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [isClicked, setClick] = useState(false);
  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={() => setClick(!isClicked)}>Click this!</button>
      { isClicked ? <div>BOO!</div> : null }
    </main>
  );
}
