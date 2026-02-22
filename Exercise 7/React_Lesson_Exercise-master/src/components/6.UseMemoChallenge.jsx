/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const factorial = useMemo(function() {
    if (number < 0) return "Invalid";
    if (number === 0) return 1;
    let result = 1;
    for (let i = 1; i <= number; i++) {
      result = result * i;
    }
    return result;
  }, [number]);

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={function(e) { setNumber(Number(e.target.value)); }}
          placeholder="Enter a number"
        />
        <p>Factorial of {number} is: {factorial}</p>
      </div>
    </main>
  );
}