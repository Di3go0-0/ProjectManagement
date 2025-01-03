import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import {
  getAllProjectsForCollaborator,
  getAllTasksForCollaborator,
  getCollaboratorsProject,
} from "../controllers";

const router = Router();



router.get("/project/:projectId", userToken, getCollaboratorsProject);
router.get("/user/project", userToken, getAllProjectsForCollaborator);
router.get("/user/task/:projectId", userToken, getAllTasksForCollaborator);

export const collaboratorRoutes = (app: any) => app.use("/collaborator", router);

