/**
 * Challenge 4: useContext
 * 
 * Description:
 * In this component, you'll consume the `AuthContext` and display the user's information.
 * 
 * 1. Use the `useContext` hook to get the context values (`user`, `login`, and `logout`).
 * 2. Display a button that toggles between `login` and `logout` states.
 * 3. If the user is logged in, display their first name, last name, and email.
 */

import { useContext } from "react";

export default function UseContextChallenge() {

  return (
    <main>
      <h1>useContext Challenge</h1>

      <button>
        {/* ... */}
      </button>
      <div>
        {/* Show user info here when logged in. */}
      </div>
    </main>
  );
}
