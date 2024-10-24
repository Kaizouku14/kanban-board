import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "please provide a valid email" }),
  password: z.string().min(1, { message: "please provide a password" }),
});

export const signUpFormSchema = z.object({
  username: z.string().min(1, { message: "please provide a username" }),
  email: z
    .string()
    .email({ message: "please provide a valid email" })
    .min(1, { message: "please provide an email" }),
  password: z
    .string()
    .min(1, { message: "please provide a password" })
    .min(6, { message: "password must at least 6 characters above" }),
});

export type signInFormSchema = typeof signInFormSchema;
export type signUpFormSchema = typeof signUpFormSchema;