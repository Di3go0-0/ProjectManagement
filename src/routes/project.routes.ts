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

/**
 * @swagger
 * tags:
 *  name: Project
 *  description: Project Management
 */

/**
 * @swagger
 * /project:
 *   get:
 *     summary: Get projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: ALl projects
 *       500:
 *         description: Error getting projects
 */
router.get("/", userToken, getProjects);

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Get project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Project Id
 *     responses:
 *       200:
 *         description: Project
 *       404:
 *         description: Project not Found
 *       500:
 *        description: Internal Server error
 */
router.get("/:id", userToken, getProjectById);

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       201:
 *         description: project created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", userToken, validateSchema(projectSchema), createProject);

/**
 * @swagger
 * /project/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: project id
 *     responses:
 *       201:
 *         description: project updated successfully
 *       404:
 *         description: project not found
 */
router.put("/:id", userToken, validateSchema(projectSchema), updateProject);

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: project id
 *     responses:
 *       201:
 *         description: project deleted successfully
 *       404:
 *         description: project not found
 */
router.delete("/:id", userToken, deleteProject);

export const projectRoutes = (app: any) => app.use("/project", router);
