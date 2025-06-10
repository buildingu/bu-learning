/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [toggle, setToggle] = useState(true);

  const show = () => {
    setToggle(!toggle);
  };

  return (
    <main>
      <h1>useState Challenge</h1>
      {toggle &&  <div>BOO!</div>}
      <button onClick={show}>Toggle</button>
    </main>
  );
}
