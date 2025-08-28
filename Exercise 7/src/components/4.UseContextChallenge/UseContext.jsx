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
  const { user, login, logout } = useContext(AuthContext);

  function handleAuthToggle() {
    if (user) {
      logout();
    } else {
      login();
    }
  }

  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={handleAuthToggle}>
        {(() => {
          if (user) {
            return "Logout";
          } 
          else {
            return "Login";
          }
        })()}
      </button>
      
      {user && (
        <div>
          <h2>User Information:</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </main>
  );
}
