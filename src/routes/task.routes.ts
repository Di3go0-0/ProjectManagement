import { Router } from "express";
import { createTask } from "../controllers";
import validateSchema from "../middleware/validateSchema";
import { taskSchema } from "../schemas/task.scheme.ts"; // Asegúrate de que la ruta sea correcta

const router = Router();

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Task"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", validateSchema(taskSchema), createTask);

export const taskRoutes = (app: any) => app.use("/task", router);
