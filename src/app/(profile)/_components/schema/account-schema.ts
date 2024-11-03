import { z } from "zod";

export const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});


export type accountFormSchema = typeof accountFormSchema