import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import { addProjectCollaborator } from "../controllers";

const router = Router();


router.post("/project", userToken, addProjectCollaborator);

export const collaboratorRoutes = (app: any) => app.use("/collaborator", router);
