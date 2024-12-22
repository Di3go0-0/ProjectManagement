import { Router } from "express";
import { userToken, validateSchema } from "../middleware";
import {
  addProjectCollaborator,
  getProjectCollaborators
} from "../controllers";

const router = Router();


router.get("/project", userToken, (req, res) => {
  res.json({ message: "Task collaborator added" });
})

router.post("/task", userToken, (req, res) => { res.json({ message: "Task collaborator added" }) });

export const collaboratorRoutes = (app: any) => app.use("/collaborator", router);

