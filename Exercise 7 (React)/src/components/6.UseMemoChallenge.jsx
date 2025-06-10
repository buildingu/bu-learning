/**
 * Challenge 6 (Optional): useMemo
 *
 * Description:
 * Create a component that computes the factorial of a number. Use useMemo on number to memoize the factorial calculation to avoid unnecessary re-calculations.
 */

import { useState, useMemo } from "react";

export default function UseMemoChallenge() {
  const [number, setNumber] = useState("");

  const factorial = useMemo(() => {
    const calculateFactorial = (n) => {
      if(n < 0) return 0;
      if(n === 0 || n === 1) return 1;
      return n * calculateFactorial(n - 1);
    };
    return calculateFactorial(number);
  }, [number]);

  const handleInputChange = (e) => {
    let val = e.target.value;

    if (val === "") {
      setNumber("");
      return;
    }

    if (Number(val) < 0) {
      alert("Invalid Input: Please enter a non-negative number");
      return;
    }

    if(val.length > 1) {
      val = val.replace(/^0+/, '');
      if (val === "") val = "0";
    }
    
    setNumber(val);
  };

  return (
    <main>
      <h1>useMemo Challenge</h1>
      <div>
        <input
          type="number"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <p>
          Factorial of {number} is: {factorial}
        </p>
      </div>
    </main>
  );
}
