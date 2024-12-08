import { createContext, ReactNode, useContext, useState } from "react";
import { IRegister } from "../Interfaces";
import { RegisterRequest, Task } from "../Api/Auth/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (user: IRegister) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (user: IRegister) => {
    try {
      const res = await RegisterRequest(user);
      console.log("Server Response:", res); // Imprime la respuesta completa del servidor
    } catch (e) {
      console.error("Error during signIn:", e);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}


