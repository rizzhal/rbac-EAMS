

import { getCurrentUser } from "@/services/authService.js";
import {  createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
    } catch (error) {
      console.error("User is not authenticated:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};