// context/AuthContext.tsx
import React, { createContext, useState, useContext } from "react";

// Define the types for the context
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
