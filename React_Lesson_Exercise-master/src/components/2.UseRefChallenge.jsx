import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>

      <input type="text" ref={inputRef} placeholder="Click the button to focus" />

      <button onClick={focusInput}>Focus</button>
    </main>
  );
}

