import { authRouter } from "./routers/auth";
import { kanbanRouter } from "./routers/kanban";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  kanban : kanbanRouter,
});

export type appRouter = typeof appRouter;
