import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { GenerateTokenProps, TokenProps } from "../interfaces";

dotenv.config();

const key = process.env.SECRET_KEY as string;

export const generateToken = ({ id, mail }: GenerateTokenProps) => {
  return jwt.sign({ id, mail }, key, { expiresIn: "12h" });
};

export const verifyToken = (token: string): TokenProps | null => {
  try {
    return jwt.verify(token, key) as TokenProps;
  } catch (error) {
    console.log("Invalid Token", error);
    return null;
  }
};
