/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);
  const factorial = useMemo(()=>{
    const makeFactorial=(n)=>{
      if (n===1) return 1;
      if (n< 0) return "undefined";
      let result = n;
      for (let i= n-1; i>=1; i--){
        result*=i
      }
      return result;
    }
    return makeFactorial(number);
  }, [number]);
  
  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(/** Value from input and convert to a number... */ Number(e.target.value))}
          placeholder="Enter a number"
        />
        <p>
           Factorial of {number} is: {/* Factorial result... */ factorial}
        </p>
      </div>
    </main>
  );
}
