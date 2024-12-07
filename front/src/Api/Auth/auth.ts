import axios from "../axios.ts";
import { IRegister } from "../../Interfaces";



export const RegisterRequest = async (User: IRegister) => {
  await axios.post(`/register`, { User });
}
