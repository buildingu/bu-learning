/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);


  const factorial = useMemo(() => {
    if (number < 0) {
      return null;
    }
    let num = 1;

    for (let i = 1; i <=number; i++) {
      num = num * i;
    }

    return num;
  }, [number]);

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number" 
          min={0}
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter a number"
        />
        <p>
           Factorial of {number} is: {factorial}
        </p>
      </div>
    </main>
  );
}
