import { ReactNode, useEffect, useState } from "react";
import { IAuthErrors, ILogin, IRegister, IUser } from "../../Interfaces";
import { LoginRequest, RegisterRequest } from "../../Api";
import { AuthContext } from "./Auth.Context";
import { AxiosError } from "axios";


interface Props {
  children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<IAuthErrors>({});


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
          return setErrors({ message: e.response.data[0] });
        }
        if (e.response && e.response.data?.mail) {
          setErrors({ mail: e.response.data.mail });
          console.log(e.response.data.mail);
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
      console.log("Server Response:", res.data); // Imprime la respuesta completa del servidor
      setIsAuthenticated(true);
      const userResponse: IUser = res.data.data;
      setUser(userResponse);
      console.log("User:", userResponse); // Imprime el usuario logueado 
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e instanceof AxiosError) {
          if (e.response && Array.isArray(e.response.data)) {
            console.log(e.response.data);
            return setErrors({ message: e.response.data[0] });
          }
          if (e.response && e.response.data?.password) {
            setErrors({ password: e.response.data.password });
            console.log(e.response.data.password);
          } if (e.response && e.response.data?.mail) {
            setErrors({ mail: e.response.data.mail });
            console.log(e.response.data.mail);
          }
        }
      }
      else {
        console.error("Unexpected error", e);
      }
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 4000);
      return () => clearTimeout(timer);
    }
    console.log(errors);
  }, [errors])


  return (
    <AuthContext.Provider value={{ isAuthenticated, SingIn, signUp, setIsAuthenticated, user, errors }}>
      {children}
    </AuthContext.Provider>
  )
}


