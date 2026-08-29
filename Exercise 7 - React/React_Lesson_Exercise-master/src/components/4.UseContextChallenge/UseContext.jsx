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
  const { currUser, login, logout } = useContext(AuthContext);
  return (
    <main>
      <h1>useContext Challenge</h1>
      <button onClick={currUser ? logout : login}>
        {currUser ? "Logout" : "Login"}
      </button>
      <div>
        {currUser ? (
          <div>
            <p>First Name: {currUser.firstName}</p>
            <p>Last Name: {currUser.lastName}</p>
            <p>Email: {currUser.email}</p>
            <p>Password: {currUser.password}</p>
            <p>User ID: {currUser.userId}</p>
          </div>
        ) : (
          <p>Please log in to see user information.</p>
        )}
      </div>
    </main>
  );
}
