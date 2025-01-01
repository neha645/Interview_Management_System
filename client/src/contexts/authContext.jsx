import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const storeUserData = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).user : null;
  };

  const [user, setUser] = useState(storeUserData);

  const login = (userData) => {
    setUser(userData?.user);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
