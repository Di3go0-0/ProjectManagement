import { z } from "zod";


export const ProjectSchema = z
  .object({
    title: z.string()
      .min(1, "Title is Required"),
    description: z.string()
      .min(1, "Description is Required"),
  });

export type CreateProjectValues = z.infer<typeof ProjectSchema>;
