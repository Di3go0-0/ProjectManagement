import { ReactNode, useEffect, useState } from "react";
import { IAuthErrors, ILogin, IRegister, IUser } from "../../Interfaces";
import { LoginRequest, LogoutRequest, RegisterRequest, ValidateUserRequest } from "../../Api";
import { AuthContext } from "./Auth.Context";
import { AxiosError } from "axios";
import Cookies from "js-cookie";


interface Props {
  children: ReactNode;
}


export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<IAuthErrors>({});
  const [isRegistered, setIsRegistered] = useState(false);

  const SignUp = async (user: IRegister) => {
    try {
      const res = await RegisterRequest(user);
      const userResponse: IUser = res.data.data;
      setUser(userResponse);
      setIsRegistered(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response && Array.isArray(e.response.data)) {
          // console.log(e.response.data);
          setIsRegistered(false);
          return setErrors({ message: e.response.data[0] });
        }
        if (e.response && e.response.data?.mail) {
          setIsRegistered(false);
          return setErrors({ mail: e.response.data.mail });
        }
      }
      else {
        setIsRegistered(false);
        console.error("Unexpected error", e);
      }
    }
  };

  const SingIn = async (user: ILogin) => {
    try {
      const res = await LoginRequest(user);
      // console.log("Server Response:", res.data); // Imprime la respuesta completa del servidor
      setIsAuthenticated(true);
      const userResponse: IUser = res.data.data;
      setUser(userResponse);
      // console.log("User:", userResponse); // Imprime el usuario logueado 
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e instanceof AxiosError) {
          if (e.response && Array.isArray(e.response.data)) {
            // console.log(e.response.data);
            return setErrors({ message: e.response.data[0] });
          }
          if (e.response && e.response.data?.password) {
            setErrors({ password: e.response.data.password });
            // console.log(e.response.data.password);
          } if (e.response && e.response.data?.mail) {
            setErrors({ mail: e.response.data.mail });
            // console.log(e.response.data.mail);
          }
        }
      }
      else {
        console.error("Unexpected error", e);
      }
    }
  }

  const Logout = async () => {
    try {
      await LogoutRequest();
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(`Error for cookie`)
      } else {
        console.log(`Unexpected error`)
      }
    }
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  const ValidateUser = async () => {
    const cookies = Cookies.get();
    if (!cookies) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const res = await ValidateUserRequest();
      setIsAuthenticated(true);
      const userResponse: IUser = res.data.data;
      setUser(userResponse);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e)
        setIsAuthenticated(false);
      }
      else {
        console.error("Unexpected error", e);
        setIsAuthenticated(false);
      }
    }
  }



  useEffect(() => {
    const token = Cookies.get(`token`);
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    ValidateUser();
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 4000);
      return () => clearTimeout(timer);
    }
    // console.log(errors);
  }, [errors])


  return (
    <AuthContext.Provider value={{ isAuthenticated, SingIn, SignUp, Logout, setIsAuthenticated, user, errors, isRegistered }}>
      {children}
    </AuthContext.Provider>
  )
}


