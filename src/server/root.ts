import { authRouter } from "./routers/auth";
import { kanbanRouter } from "./routers/kanban";
import { profileRouter } from "./routers/profile";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  kanban : kanbanRouter,
  profile : profileRouter,
});

export type appRouter = typeof appRouter;
