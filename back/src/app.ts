import express from "express";
import { taskRoutes, AuthRoutes, projectRoutes } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

taskRoutes(app);
AuthRoutes(app);
projectRoutes(app);

export default app;
