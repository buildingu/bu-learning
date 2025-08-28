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
import AuthContext from "./AuthContext";

export default function UseContextChallenge() {
  // get user, login, and logout
  const { user, login, logout } = useContext(AuthContext);

  return (
    <main>
      <h1>useContext Challenge</h1>

      {/* if user is logged in, call logout function. if user is logged out, call login */}
      <button onClick={user ? logout : login}>
        {/* if user is logged in, show "logout". otherwise show "login" */}
        {user ? "Logout" : "Login"}
      </button>
      <div>
        {/* Show user info here when logged in. */}
        {user ? (
          <p>
            Your Information: <br />
            {user.firstName} {user.lastName} <br /> {user.email} <br />{" "}
            {user.phone}
          </p>
        ) : (
          <p>To view your information, login.</p>
        )}
      </div>
    </main>
  );
}
