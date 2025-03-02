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
import { AuthContext } from "./AuthContext";

export default function UseContextChallenge() {
  // Access authentication context
  const { user, login, logout } = useContext(AuthContext);

  return (
    <main>
      <h1>useContext Challenge</h1>

      {/* Button to toggle login/logout */}
      <button onClick={user ? logout : login}>
        {user ? "Logout" : "Login"}
      </button>

      {/* Show user info if logged in */}
      <div>
        {user && (
          <p>
            Welcome, {user.firstName} {user.lastName}! <br />
            Email: {user.email}
          </p>
        )}
      </div>
    </main>
  );
}