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

import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext.jsx";

export default function UseContextChallenge() {

  const { user, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main>
      <h1>useContext Challenge</h1>
      {user ? (
        <div>
          <p>Welcome, {user.firstName} {user.lastName}!</p>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in.</p>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button onClick={() => login(email, password)}>
            Login
          </button>
        </div>
      )}
    </main>
  );
}

     