import { z } from "zod";

export const accountFormSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "username is required." })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." }),
    password: z.string(),
    newPassword: z.string(),
  })

export type accountFormSchema = typeof accountFormSchema;
