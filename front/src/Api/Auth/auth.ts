import axios from "../axios.ts";
import { ILogin, IRegister } from "../../Interfaces";



export const RegisterRequest = async (User: IRegister) => {
  const response = await axios.post(`/register`, User);
  return response;
}

export const LoginRequest = async (User: ILogin) => {
  const response = await axios.post(`/login`, User);
  return response;
}


