import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { getAllProjects } from "@/lib/api/kanban/queries";

export const kanbanRouter = createTRPCRouter({

  projects: publicProcedure.query(async () => {
    return await getAllProjects();
  }),

  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      return input;
    }),
});

export type kanbanRouter = typeof kanbanRouter;


