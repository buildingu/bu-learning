import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState(0);

  const factorial = useMemo(() => {
    const n = Math.floor(number); // ensure integer
    if (n < 0) return "Undefined for negative numbers";
    if (n === 0 || n === 1) return 1;

    let result = 1;
    for (let i = 2; i <= n; i++) {
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
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Enter a number"
        />
        <p>Factorial of {number} is: {factorial}</p>
      </div>
    </main>
  );
}
