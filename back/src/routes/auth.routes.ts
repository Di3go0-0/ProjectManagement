import { Router } from "express";
import { userToken as userToken, validateSchema } from "../middleware";
import { login, logout, register, users, validateUser } from "../controllers";
import { registerSchema, loginSchema } from "../schemas";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", userToken, logout);
router.post("/validate", userToken, validateUser);
router.get("/users", userToken, users)

export const AuthRoutes = (app: any) => {
  app.use("/", router);
};
