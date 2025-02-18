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

import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext"

export default function UseContextChallenge() {
  const { user, login, logout } = useContext(AuthContext)

  const handleClick = () => {
    if (user) {
      logout()
      // setLoggedCondition(true)
    } else {
      login()
      // setLoggedCondition(false)
    }
  }
  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={handleClick}>
        { user ? "Logout" : "Login" }
      </button>
        { user ?
        <div>
          <p>First name: {user.firstName}</p> 
          <p>Last name: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </div>
        : null}
    </main>
  );
}
