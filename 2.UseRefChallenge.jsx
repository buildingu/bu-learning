/**
 * Challenge 2: useRef
 *
 * Description:
 * Create an input field with a button labeled "Focus". When the button is clicked, use useRef to focus on the input field.
 */

import { use } from "react";
import { useState, useRef } from "react";

export default function UseRefChallenge() {

  const inputRef = useRef();

  function Focus(){
    inputRef.current.focus();
  }
  return (
    <main>
      <h1>useRef Challenge</h1>
      <input type = "text" ref={inputRef}></input>
      <br></br>
      <button onClick={Focus}>Focus</button>
    </main>
  );
}
