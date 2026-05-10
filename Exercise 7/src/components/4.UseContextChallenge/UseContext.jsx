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
      {user && (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </main>
  );
}
