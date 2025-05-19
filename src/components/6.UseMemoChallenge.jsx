import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  // Step 1: Factorial function
  const calculateFactorial = (n) => {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
  };

  // Step 2: Memoize factorial result using useMemo
  const factorial = useMemo(() => calculateFactorial(number), [number]);

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
