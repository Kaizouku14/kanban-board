import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getAllProjects } from "@/lib/api/kanban/queries";
import { createProject } from "@/lib/api/kanban/mutations";

const taskSchema = z.object({
  id: z.string().min(1), 
  title: z.string().min(1), 
  column: z.string().min(1),
});

export const kanbanRouter = createTRPCRouter({
  projects: publicProcedure.query(async () => {
    return await getAllProjects();
  }),

  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        tasks: z.array(taskSchema).optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return createProject({
        title: input.title,
        userId : ctx.user?.id,
        tasks: input.tasks ?? [],
       });
    }),
});

export type kanbanRouter = typeof kanbanRouter;
