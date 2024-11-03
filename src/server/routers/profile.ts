import { createTRPCRouter, protectedProcedure } from "../trpc";


export const profileRouter = createTRPCRouter({
  getUserInfo : protectedProcedure.query(async ({ ctx }) => {
      return ctx.user
  })
});



export type profileRouter = typeof profileRouter;