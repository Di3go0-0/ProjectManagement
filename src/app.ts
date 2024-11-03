import express from "express";
import { taskRoutes } from "./routes";

const app = express();

app.use(express.json());

taskRoutes(app);

export default app;
