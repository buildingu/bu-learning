/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";
const ShowBOO = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle BOO!</button>
      {show && <div>BOO!</div>}
    </div>
  );
}
export default function UseStateChallenge() {
  return (
    <main>
      <h1>useState Challenge</h1>      
      <ShowBOO />
    </main>
  );
}
