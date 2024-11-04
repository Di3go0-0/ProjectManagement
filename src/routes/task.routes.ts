import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  toggleTask,
  updateTask,
} from "../controllers";
import { validateSchema } from "../middleware";
import { taskSchema } from "../schemas"; // Asegúrate de que la ruta sea correcta

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
 *     responses:
 *       200:
 *         description: ALl tasks
 *       400:
 *         description: Error getting tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task
 *       404:
 *         description: Task not Found
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
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

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Task"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Task id
 *     responses:
 *       201:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put("/:id", validateSchema(taskSchema), updateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Task id
 *     responses:
 *       201:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", deleteTask);

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Toggle task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Task id
 *     responses:
 *       201:
 *         description: Toggle task
 *       404:
 *         description: Task not found
 */
router.patch("/:id", toggleTask);

export const taskRoutes = (app: any) => app.use("/task", router);
