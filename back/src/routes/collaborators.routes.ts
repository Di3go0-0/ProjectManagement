import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import {
  getAllProjectsForCollaborator,
  getAllTasksForCollaborator,
  getCollaboratorsProject,
} from "../controllers";

const router = Router();



router.get("/project/:projectId", userToken, getCollaboratorsProject);
router.get("/user/project/:userId", userToken, getAllProjectsForCollaborator);
router.get("/user/task/:projectId", userToken, getAllTasksForCollaborator);
router.post("/task", userToken, (req, res) => { res.json({ message: "Task collaborator addeda" }) });

export const collaboratorRoutes = (app: any) => app.use("/collaborator", router);

