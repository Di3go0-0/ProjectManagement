import { Router } from "express";
import { createTask, getTasks } from "../controllers";
import validateSchema from "../middleware/validateSchema";
import { taskSchema } from "../schemas/task.scheme.ts"; // Asegúrate de que la ruta sea correcta

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Task
 *  description : Task management
 */

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get tasks
 *     tags: [Task]
 *     description: Get all tasks
 *     responses:
 *       200:
 *         description: ALl tasks
 *       400:
 *         description: Error getting tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
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
