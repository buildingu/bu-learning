/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {

  const [boo, setBoo] = useState("BOO!")

  function toggleBoo() {
    if (boo == "BOO!") {
      setBoo("")
    } else {
      setBoo("BOO!")
    }
  }

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={toggleBoo}>Toggle</button>
      <div>{boo}</div>
    </main>
  );
}
