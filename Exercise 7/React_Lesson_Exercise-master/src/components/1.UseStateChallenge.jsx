/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [show, setShow] = useState(true);

  function toggleShow() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={toggleShow}>
        {show ? "Hide" : "Show"}
      </button>
      {show ? <div>BOO!</div> : null}
    </main>
  );
}