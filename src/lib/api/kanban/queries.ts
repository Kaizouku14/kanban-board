import { db, eq } from "@/lib/db";
import { project } from "@/lib/db/schema/project";
import { TRPCError } from "@trpc/server";

export const getAllProjects = async (userId: string | undefined) => {
  if (!userId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `User Not found`,
    });
  }

  return await db.select().from(project).where(eq(project.userId, userId));
};
