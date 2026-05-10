import { useRef } from "react";

export default function UseRefChallenge() {
  const inputRef = useRef(null);

  return (
    <main>
      <h1>useRef Challenge</h1>
      <input ref={inputRef} type="text" placeholder="Click 'Focus' to focus me" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </main>
  );
}
