import { useState } from "react";

export default function UseStateChallenge() {
  const [show, setShow] = useState(false);

  return (
    <main>
      <h1>useState Challenge</h1>

      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} BOO
      </button>

      {show && <div>BOO!</div>}
    </main>
  );
}