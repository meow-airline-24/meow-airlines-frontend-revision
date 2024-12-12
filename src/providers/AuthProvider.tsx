"use client"

// provider/AuthProvider.tsx
import React, { ReactNode } from "react";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext"; // Import context definition

// Provider component that provides the context to children components
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
