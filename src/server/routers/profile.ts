import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { udpateUserInfo } from "@/lib/api/profle/mutations";

export const profileRouter = createTRPCRouter({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),

  updateUser: protectedProcedure
    .input(
      z.object({
        username: z.string().min(1),
        email: z.string().email(),
        password: z.string(),
        newPassword: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
       return await udpateUserInfo({
         ...input,
         userId: ctx.user?.id,
       })
    }),
});

export type profileRouter = typeof profileRouter;
