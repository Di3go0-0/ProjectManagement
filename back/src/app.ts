import express from "express";
import { taskRoutes, AuthRoutes, projectRoutes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const clientURL = process.env.CLIENT_URL as string;

const app = express();
app.use(cors({
  origin: clientURL,
  credentials: true,
}
));
app.use(express.json());
app.use(cookieParser());

taskRoutes(app);
AuthRoutes(app);
projectRoutes(app);

export default app;
