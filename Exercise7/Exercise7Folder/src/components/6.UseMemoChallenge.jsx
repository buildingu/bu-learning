/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  // initialize number to ""
  const [number, setNumber] = useState("");

  // factorial calculation
  const factorial = (number) => {
    // don't calculate negative numbers
    if (number < 0) {
      return "Undefined";
    }
    // return 1 if the number is 0 or 1
    else if (number === 0 || number === 1) {
      return 1;
    }
    // otherwise, multiply by the number 1 less until number reaches 1
    return number * factorial(number - 1);
  };

  // factorial only recalculates when the number changes
  const memoizedFactorial = useMemo(() => factorial(number), [number]);

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          // convert input into a number and update its value with setNumber
          // e: event object; target: element that triggers event; value: stores current text in input
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter a number"
        />
        <p>
          Factorial of {number} is: {memoizedFactorial}
        </p>
      </div>
    </main>
  );
}
