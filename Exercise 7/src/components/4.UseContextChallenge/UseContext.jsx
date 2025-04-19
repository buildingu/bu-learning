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
  let logged = "Logged in";

  const checkLog = () => {
    if(user === null){
      logged = "Logged out";
    }
    else logged = "Logged in"
  }
 

  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={user ? logout : login}>{user ? "Logout" : "Login" }</button>

      <div>
        {user &&
          <p>{user.firstName}</p>
        }
      </div>
    </main>
  );
}
