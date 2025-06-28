/**
 * Challenge 1: useState
 * 
 * Description:
 * Create a toggle button to show and hide the div containing the text `BOO!`.
 */

import { useState } from "react";
import '../index.css';

export default function UseStateChallenge() {

  const [toggled, setToggled] = useState(true)

  function setClick(){
    setToggled(!toggled)
    

  }
  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick = {setClick} className={toggled? 'hideButton': 'showButton'}>{toggled ? 'Hide' : 'Show'}</button>
      <div>{toggled ? 'Boo' : null}</div>
    </main>
  );
}
