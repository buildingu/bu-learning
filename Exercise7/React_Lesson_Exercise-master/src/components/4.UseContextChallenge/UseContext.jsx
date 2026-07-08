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
import AuthContext from "./AuthContext";

import { useContext } from "react";

export default function UseContextChallenge() {
  const { currentUser, login, logout } = useContext(AuthContext);
  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={currentUser ? logout : login}>
        {currentUser ? "Logout" : "Login"}
      </button>
      {currentUser && (
        <div>
          <p>First Name: {currentUser.firstName}</p>
          <p>Last Name: {currentUser.lastName}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
    </main>
  );
}
