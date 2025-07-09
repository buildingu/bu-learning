/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);
  /* Main Factorial Method */
  const factorial = useMemo(() => {
    /* Factorial Calculation */
    let result = 1;
    for (let i = 1; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]); // we only need to recompute the factorial if the input number changes
  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter a number"
        />
        <h3>
           Factorial of {number} is: {factorial}
        </h3>
      </div>
    </main>
  );
}
