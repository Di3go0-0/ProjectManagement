import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "The name is required"),
    mail: z
      .string()
      .email("The email is invalid")
      .min(1, "The email is required"),
    password: z.string().min(6, "The password has to be min 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "The confirm password has to be min 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // validamos que las dos passwords sean iguales
    message: "The password no match",
    path: ["confirmPassword"], // path es el campo que queremos validar
  });


export const LoginSchema = z
  .object({
    mail: z
      .string()
      .email("The email is invalid")
      .min(1, "The email is required"),
    password: z.string().min(6, "The password has to be min 6 characters"),
  });

export type FormValues = z.infer<typeof RegisterSchema>; // inferimos el tipo del schema.
export type LoginFormValues = z.infer<typeof LoginSchema>; // inferimos el tipo del schema.
