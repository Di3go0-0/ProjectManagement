import { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { login, logout, register } from "../controllers";
import { registerSchema, loginSchema } from "../schemas";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating User
 */
router.post("/register", validateSchema(registerSchema), register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login Successful
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Error creating User
 */
router.post("/login", validateSchema(loginSchema), login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 *       400:
 *         description: No token found
 *       500:
 *         description: Error logging out
 */
router.post("/logout", logout);

export const AuthRoutes = (app: any) => {
  app.use("/", router);
};
