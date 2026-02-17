/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const calcFactorial = (n) => {
    console.log('Calculating factorial...');
    
    if (n < 0) return 'Invalid';
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const factorial = useMemo(() => {
    return calcFactorial(number);
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
          style={{ padding: '10px', marginBottom: '20px' }}
        />
        <p>
          Factorial of {number} is: <strong>{factorial}</strong>
        </p>
      </div>
    </main>
  );
}