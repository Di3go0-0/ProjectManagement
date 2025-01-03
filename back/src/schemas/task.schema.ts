import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  projectId: z.number().int({ message: "Project ID is required" }),
});

export type TaskSchema = z.infer<typeof taskSchema>;
