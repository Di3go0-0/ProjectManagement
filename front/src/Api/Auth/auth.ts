import axios from "../axios.ts";
import { IRegister } from "../../Interfaces";



export const RegisterRequest = (User: IRegister) => {
  axios.post(`/register`, User);
}
