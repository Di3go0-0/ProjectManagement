import express from "express";
import { taskRoutes, AuthRoutes } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

taskRoutes(app);
AuthRoutes(app);

export default app;
