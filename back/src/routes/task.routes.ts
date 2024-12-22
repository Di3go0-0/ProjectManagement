import { Router } from "express";
import {
  addCollaborator,
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  toggleTask,
  updateTask,
} from "../controllers";
import { userToken, validateSchema } from "../middleware";
import { taskSchema } from "../schemas"; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get("/", userToken, getTasks);
router.get("/:id", userToken, getTaskById);
router.post("/", userToken, validateSchema(taskSchema), createTask);
router.put("/:id", userToken, validateSchema(taskSchema), updateTask);
router.delete("/:id", userToken, deleteTask);
router.patch("/:id", userToken, toggleTask);
router.post("/collaborator", userToken, addCollaborator)

export const taskRoutes = (app: any) => app.use("/task", router);
