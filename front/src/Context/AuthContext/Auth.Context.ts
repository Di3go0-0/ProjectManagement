import { createContext, useContext } from "react";
import { IAuthErrors, ILogin, IRegister, IUser } from "../../Interfaces";

interface AuthContextType {
  isAuthenticated: boolean;
  SingIn: (user: ILogin) => void;
  SignUp: (user: IRegister) => void;
  Logout: () => void;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  user: IUser | null;
  errors: IAuthErrors;
  isRegistered: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

