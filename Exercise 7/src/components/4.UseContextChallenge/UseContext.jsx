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
  const {authUser, login, logout} = useContext(AuthContext);

  const HandleAuthClick  = () => {
    if (authUser) {
      logout();
    } else {
      login();
    }
  };

  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={HandleAuthClick}>
        {authUser ? 'Log Out' : 'Log In'}
      </button>
      <div>
        {authUser && (
          <>
            <p>First Name: {authUser.firstName}</p>
            <p>Last Name: {authUser.lastName}</p>
            <p>Email: {authUser.email}</p>
          </>
        )}
      </div>
    </main>
  );
}
