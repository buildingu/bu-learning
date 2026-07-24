/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */
import { useState, useMemo } from "react";

function calculateFactorial(n) {
  n = Math.round(n)
  if (n < 0) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
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
/*Tweak: Make sure to have the negative numbers return as null*/