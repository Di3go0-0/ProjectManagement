import axios from "../axios.ts";
import { IRegister } from "../../Interfaces";



export const RegisterRequest = async (User: IRegister) => {
  const response = await axios.post(`/register`, User);
  return response;
}


