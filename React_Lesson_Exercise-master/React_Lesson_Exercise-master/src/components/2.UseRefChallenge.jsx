import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <main>
      <h1>useRef Challenge</h1>

      <input ref={inputRef} type="text" />

      <button onClick={handleFocus}>
        Focus
      </button>
    </main>
  );
}