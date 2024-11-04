import { Router } from "express";
import {
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
router.get("/", userToken, getTasks);

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
router.get("/:id", userToken, getTaskById);

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
router.post("/", userToken, validateSchema(taskSchema), createTask);

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
router.put("/:id", userToken, validateSchema(taskSchema), updateTask);

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
router.delete("/:id", userToken, deleteTask);

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
router.patch("/:id", userToken, toggleTask);

export const taskRoutes = (app: any) => app.use("/task", router);
