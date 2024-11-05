import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export const signUpFormSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .min(1, { message: "Email is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please try again.",
    path: ["confirmPassword"],
  });

export type signInFormSchema = typeof signInFormSchema;
export type signUpFormSchema = typeof signUpFormSchema;
