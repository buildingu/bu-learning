import React, { useMemo, useState } from 'react';

/**
 * Challenge: demonstrate useMemo to avoid expensive recalcs
 * Requirements:
 * 1. Have a number input (stateful)
 * 2. Compute a slow function (e.g. fibonacci) on that number
 * 3. Wrap it in useMemo so it only re-runs when the number changes
 */

function expensiveFib(n) {
  // naive, slow fib
  if (n < 2) return n;
  return expensiveFib(n - 1) + expensiveFib(n - 2);
}

export default function UseMemoChallenge() {
  const [num, setNum] = useState(35);
  const fib = useMemo(() => expensiveFib(num), [num]);

  return (
    <div style={{ padding: 20, color: '#fff' }}>
      <h2>useMemo Challenge</h2>
      <input
        type="number"
        value={num}
        onChange={e => setNum(Number(e.target.value))}
        style={{ width: 80, marginRight: 10 }}
      />
      <span>Fibonacci({num}) = {fib}</span>
    </div>
  );
}
