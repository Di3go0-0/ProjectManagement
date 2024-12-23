import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import {
  getCollaboratorsProject,
} from "../controllers";

const router = Router();



router.get("/project", userToken, getCollaboratorsProject);


router.post("/task", userToken, (req, res) => { res.json({ message: "Task collaborator addeda" }) });

export const collaboratorRoutes = (app: any) => app.use("/collaborator", router);

