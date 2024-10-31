import { getSession } from "@/lib/auth/lucia";
import { authRouter } from "./routers/auth";
import { createTRPCRouter } from "./trpc";

export const createTRPCContext = async (opts: { headers: Headers }) => {
   const { session , user } = await getSession();

  return {
      session,
      user,
      ...opts
  };
}

export const appRouter = createTRPCRouter({
    auth : authRouter,
});

export type appRouter = typeof appRouter;

