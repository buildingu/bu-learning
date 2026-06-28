import { createContext, useState } from "react";

// Create context
export const AuthContext = createContext();

// Mock user
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;