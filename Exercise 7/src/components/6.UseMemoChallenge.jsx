/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [inputValue, setInputValue] = useState("");
  const number = parseInt(inputValue) || 0;

  const factorial = useMemo(() => {
    if (number < 0) return "Invalid input";
    if (number === 0 || number === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]);

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={function(e) { setInputValue(e.target.value); }}
          placeholder="Enter a number"
        />
        <p>
           Factorial of {number} is: {factorial}
        </p>
      </div>
    </main>
  );
}
