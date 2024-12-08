import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../controllers";
import { projectSchema } from "../schemas";

const router = Router();

router.get("/", userToken, getProjects);
router.get("/:id", userToken, getProjectById);
router.post("/", userToken, validateSchema(projectSchema), createProject);
router.put("/:id", userToken, validateSchema(projectSchema), updateProject);
router.delete("/:id", userToken, deleteProject);

export const projectRoutes = (app: any) => app.use("/project", router);