import { z } from 'zod';
import { publicProcedure, createTRPCRouter  } from '../trpc';

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z
          .string()
          .email()
          .min(1),
        password: z
          .string()
          .min(6),
        confirmPassword: z
          .string()
          .min(6),
      })
    )
    .mutation(async ({ input }) => {
        console.log(input)
    }),
});

export type authRouter = typeof authRouter;