import { createContext, useState } from "react";

// Step 1: Create a mock user object
const mockUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  username: "janedoe123",
};

// Step 2: Create the context
const AuthContext = createContext(null);

// Step 3: Create the provider component
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    alert("User session timed out.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
