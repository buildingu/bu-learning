import { useState, useMemo } from "react";

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const result = useMemo(() => factorial(number), [number]);

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
          Factorial of {number} is: {result}
        </p>
      </div>
    </main>
  );
}
