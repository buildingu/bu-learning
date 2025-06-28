/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const Factorial =useMemo(() =>{
    const num = Number(number)
    if(num < 0){
      return "Undefined"

    }
    if(num === 0 || num === 1){
      return "1"
    }
    let answer = 1;
    for(let i = num; i> 1 ; i--){
      if(num <= 0){
        break;

      }
      answer*=i

    }
    return answer;
  }, [number])

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
        />
        <p>
           Factorial of {number} is: {Factorial}
        </p>
      </div>
    </main>
  );
}
