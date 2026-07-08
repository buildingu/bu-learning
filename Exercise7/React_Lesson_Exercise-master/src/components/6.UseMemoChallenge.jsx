/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */
import { useState, useMemo } from "react";

function calculateFactorial(n) {
  if (n <= 0) return 1;
  return n * calculateFactorial(n - 1);
}

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);
  const factorial = useMemo(() => {
    return calculateFactorial(number);
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
           Factorial of {number} is: {factorial}
        </p>
      </div>
    </main>
  );
}
