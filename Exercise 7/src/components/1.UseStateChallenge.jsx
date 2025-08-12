/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {setVisible(!visible)};
  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={toggleVisibility}>Click here</button> {
        visible && (<div>BOO!</div>)}
    </main>
  );
}
