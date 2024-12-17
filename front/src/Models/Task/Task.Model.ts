import { z } from "zod";


export const TaskSchema = z
  .object({
    title: z.string()
      .min(1, "Title is Required"),
    description: z.string()
      .min(1, "Description is Required"),
  });

export type TaskValues = z.infer<typeof TaskSchema>;
