/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {

  const [visible, setVisibility] = useState(true)

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={() => setVisibility(!visible)}>
        {visible ? "Hide Div" : "Show Div"}
      </button>
      {visible && (<div>BOO!</div>)}
    </main>
  );
}
