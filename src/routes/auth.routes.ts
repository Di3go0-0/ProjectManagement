import { Router } from "express";
import { userToken as userToken, validateSchema } from "../middleware";
import { login, logout, register, validateUser } from "../controllers";
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
router.post("/logout", userToken, logout);

/**
 * @swagger
 * /validate:
 *   post:
 *     summary: Validate a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Validation successful
 *       400:
 *         description: No token found
 *       401:
 *         description: Invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Error validating user
 */
router.post("/validate", userToken, validateUser);

export const AuthRoutes = (app: any) => {
  app.use("/", router);
};
