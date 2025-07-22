/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const[isVisible, setIsVisible] = useState(false)

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={()=> setIsVisible(!isVisible)}>
        Toggle
      </button>
      {isVisible &&<div>BOO!</div>}
    </main>
  );
}
