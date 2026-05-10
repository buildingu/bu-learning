import { createContext, useState } from "react";

const mockUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  role: "admin",
};

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = () => setUser(mockUser);

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
