import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateSchema = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};

export default validateSchema;
