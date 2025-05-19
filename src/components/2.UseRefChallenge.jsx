import { useRef } from "react";

export default function UseRefChallenge() {
  // Step 1: Create a ref for the input field
  const inputRef = useRef(null);

  // Step 2: Create a function to focus on the input field
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>

      {/* Step 3: Input field */}
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Click the button to focus me" 
      />

      {/* Step 4: Button to trigger the focus */}
      <button onClick={focusInput}>
        Focus
      </button>
    </main>
  );
}
