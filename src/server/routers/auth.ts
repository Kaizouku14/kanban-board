import { z } from 'zod';
import { publicProcedure, createTRPCRouter  } from '../trpc';
import { signupUser } from '@/lib/api/auth/mutations';

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
      })
    )
    .mutation(async ({ input }) => {
       return await signupUser(input);
    }),
});

export type authRouter = typeof authRouter;