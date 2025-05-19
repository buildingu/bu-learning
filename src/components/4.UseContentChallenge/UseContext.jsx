import { useContext } from "react";
import AuthContext from "./AuthContext";  // Import AuthContext

export default function UseContextChallenge() {
  // Step 1: Consume the AuthContext using useContext
  const { user, login, logout } = useContext(AuthContext);

  return (
    <main>
      <h1>useContext Challenge</h1>

      {/* Step 2: Toggle button between login and logout */}
      <button onClick={user ? logout : login}>
        {user ? "Logout" : "Login"}
      </button>

      <div>
        {/* Step 3: Display user info when logged in */}
        {user ? (
          <div>
            <h2>Welcome, {user.firstName} {user.lastName}!</h2>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Please log in to view your information.</p>
        )}
      </div>
    </main>
  );
}
