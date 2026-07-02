import { useContext } from "react";
import AuthContext from "./AuthContext";

export default function UseContextChallenge() {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <main>
      <h1>useContext Challenge</h1>

      <button onClick={user ? logout : login}>
        {user ? "Logout" : "Login"}
      </button>

      <div>
        {user && (
          <>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
          </>
        )}
      </div>
    </main>
  );
}