import { createContext, useContext } from "react";
import { IRegister, IUser } from "../../Interfaces";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (user: IRegister) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: IUser | null;
  errors: string[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
