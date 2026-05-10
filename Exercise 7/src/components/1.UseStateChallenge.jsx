import { useState } from "react";

export default function UseStateChallenge() {
  const [visible, setVisible] = useState(true);

  return (
    <main>
      <h1>useState Challenge</h1>
      <button onClick={() => setVisible((prev) => !prev)}>
        {visible ? "Hide" : "Show"}
      </button>
      {visible && <div>BOO!</div>}
    </main>
  );
}
