import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import { zodToJsonSchema } from "zod-to-json-schema";
import { projectSchema, taskSchema } from "./schemas"; // Asegúrate de que la ruta sea correcta
import { registerSchema, loginSchema } from "./schemas";
import {
  authswaggerDocs,
  collaboratorSwaggerDocs,
  projectSwaggerDocs,
  taskSwaggerDocs,
} from "./swaggerDots";
// Convierte el esquema Zod a un esquema JSON

const taskjsonSchema = zodToJsonSchema(taskSchema);
const registerjsonSchema = zodToJsonSchema(registerSchema);
const loginjsonSchema = zodToJsonSchema(loginSchema);
const projectjsonSchema = zodToJsonSchema(projectSchema);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "API documentation for the Project Management system",
    },
    // servers: [
    //   {
    //     url: "http://localhost:3000", // Cambia esto según tu entorno
    //   },
    // ],
    components: {
      schemas: {
        Project: projectjsonSchema, // Asegúrate de que esté definido como "Project"
        Task: taskjsonSchema, // Asegúrate de que esté definido como "Task"
        Register: registerjsonSchema,
        Login: loginjsonSchema,
      },
    },
    paths: {
      ...authswaggerDocs.paths,
      ...projectSwaggerDocs.paths,
      ...taskSwaggerDocs.paths,
      ...collaboratorSwaggerDocs.paths,
    },
    tags: [
      ...authswaggerDocs.tags,
      ...projectSwaggerDocs.tags,
      ...taskSwaggerDocs.tags,
      ...collaboratorSwaggerDocs.tags,
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Asegúrate de que las rutas coincidan
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
