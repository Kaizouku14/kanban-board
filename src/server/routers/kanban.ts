import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getAllProjects } from "@/lib/api/kanban/queries";
import {
  createProject,
  createTask,
  updateTask,
} from "@/lib/api/kanban/mutations";

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
        userId: ctx.user?.id,
        tasks: input.tasks ?? [],
      });
    }),

  addTask: protectedProcedure
    .input(
      z.object({
        projectId: z.number().int(),
        task: taskSchema,
      })
    )
    .mutation(({ input }) => {
      return createTask({
        projectId: input.projectId,
        task: input.task,
      });
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        projectId: z.number().int(),
        id: z.string().min(1),
        column: z.string().min(1),
      })
    )
    .mutation(({ input }) => {
      return updateTask({
        projectId: input.projectId,
        id: input.id,
        column: input.column,
      });
    }),
});

export type kanbanRouter = typeof kanbanRouter;
