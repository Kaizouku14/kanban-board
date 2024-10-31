import { z } from "zod";

export const createFormSchema = z.object({
  projectName: z
    .string()
    .min(1, { message: "projectName is required." }),
})

export type createFormSchema = typeof createFormSchema;
