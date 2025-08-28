/**
 * Challenge 1: useState
 *
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";

export default function UseStateChallenge() {
  // isToggled stores whether or not BOO shows. set to false initially
  // setIsToggled will update the value of isToggled
  const [isToggled, setIsToggled] = useState(false);

  // create a function to flip the value of isToggled
  const toggle = () => {
    // update isToggled to the opposite of the previous value
    setIsToggled((prev) => !prev);
  };

  return (
    <main>
      <h1>useState Challenge</h1>
      {/* button calls on toggle function*/}
      <button onClick={toggle}>Toggle</button>
      {/* show or hide the <div> based on the value of isToggled */}
      {isToggled && <div>BOO!</div>}
    </main>
  );
}
