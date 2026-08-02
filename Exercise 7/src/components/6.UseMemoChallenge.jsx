/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  function factorialOfNum(num) {
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
      factorial = i * factorial;
    }
    return factorial;
  }

  const factorialNum = useMemo(() => {
    return factorialOfNum(number);
  }, [number]);

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.currentTarget.value))}
          placeholder="Enter a number"
        />
        <p>
          Factorial of {number} is: {factorialNum}
        </p>
      </div>
    </main>
  );
}
