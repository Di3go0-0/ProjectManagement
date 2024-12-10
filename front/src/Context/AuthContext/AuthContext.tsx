import { ReactNode, useState } from "react";
import { ILogin, IRegister, IUser } from "../../Interfaces";
import { LoginRequest, RegisterRequest } from "../../Api";
import { AuthContext } from "./Auth.Context";
import { AxiosError } from "axios";


interface Props {
  children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const signUp = async (user: IRegister) => {
    try {
      const res = await RegisterRequest(user);
      console.log("Server Response:", res.data); // Imprime la respuesta completa del servidor
      setIsAuthenticated(true);
      const userResponse: IUser = res.data.data;
      setUser(userResponse);
      console.log("User:", userResponse); // Imprime el usuario creado
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && Array.isArray(e.response.data)) {
          console.log(e.response.data);
          return setErrors(e.response.data);
        }
        if (e.response && e.response.data?.message) {
          setErrors([e.response.data.message]);
          console.log(e.response.data.message);
        }
      }
      else {
        console.error("Unexpected error", e);
      }
    }
  };

  const SingIn = async (user: ILogin) => {
    try {
      const res = await LoginRequest(user);
      setIsAuthenticated(true);
      console.log(res.data)
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && Array.isArray(e.response.data)) {
          console.log(e.response.data);
          return setErrors(e.response.data);
        }
        if (e.response && e.response.data?.message) {
          setErrors([e.response.data.message]);
          console.log(e.response.data.message);
        }
      }
      else {
        console.error("Unexpected error", e);
      }
    }
  }



  return (
    <AuthContext.Provider value={{ isAuthenticated, SingIn, signUp, setIsAuthenticated, user, errors }}>
      {children}
    </AuthContext.Provider>
  )
}


