import express from "express";
import { taskRoutes, AuthRoutes, projectRoutes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const clientURL = process.env.CLIENT_URL as string;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",

  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

taskRoutes(app);
AuthRoutes(app);
projectRoutes(app);

export default app;
