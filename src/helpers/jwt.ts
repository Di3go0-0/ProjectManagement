import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.SECRET_KEY as string;

interface GenerateTokenProps {
  id: number;
  mail: string;
}

export const generateToken = ({ id, mail }: GenerateTokenProps) => {
  return jwt.sign({ id, mail }, key, { expiresIn: "12h" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    console.log("Invalid Token", error);
    return null;
  }
};
