/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

function factorial(n) {
  if (n < 0) return null;
  if (n === 0) return 1;
  let result = 1;
  while (n > 1) {
    result *= n;
    n--;
  }
  return result;
}

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const factorialResult = useMemo(() => {
    return factorial(number);
  }, [number]);

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
        <p>
          Factorial of {number} is: {factorialResult}
        </p>
      </div>
    </main>
  );
}
