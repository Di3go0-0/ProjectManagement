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

export const LogoutRequest = async () => {
  const response = await axios.post(`/logout`);
  return response;
}

export const ValidateUserRequest = async () => {
  const response = await axios.post(`/validate`)
  return response;
}
