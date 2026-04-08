import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  phoneNumber: string | null;
  login: (phone: string, token: string) => Promise<boolean>;
  logout: () => void;
  requestToken: (phone: string) => Promise<boolean>;
  tokenSent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [tokenSent, setTokenSent] = useState(false);

  // Simula verificação de token salvo
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedPhone = localStorage.getItem("phone_number");

    if (savedToken && savedPhone) {
      setIsAuthenticated(true);
      setPhoneNumber(savedPhone);
    }

    setIsLoading(false);
  }, []);

  const requestToken = async (phone: string): Promise<boolean> => {
    // Simula envio de SMS
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Token enviado para ${phone}: 123456`);
        setTokenSent(true);
        setPhoneNumber(phone);
        setIsLoading(false);
        resolve(true);
      }, 2000);
    });
  };

  const login = async (phone: string, token: string): Promise<boolean> => {
    // Simula verificação do token
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (token === "123456") {
          setIsAuthenticated(true);
          setPhoneNumber(phone);
          localStorage.setItem("auth_token", "fake_token_" + Date.now());
          localStorage.setItem("phone_number", phone);
          setTokenSent(false);
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPhoneNumber(null);
    setTokenSent(false);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("phone_number");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        phoneNumber,
        login,
        logout,
        requestToken,
        tokenSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}