import { Task } from "@/interface/ITask";
import { db, eq } from "@/lib/db";
import { project } from "@/lib/db/schema/project";
import { TRPCError } from "@trpc/server";

interface Project {
  title: string;
  userId?: string;
  tasks: Task[];
}

export const createProject = async ({ ...props }: Project) => {
  const { title, userId, tasks } = props;

  const [existingProject] = await db
    .select()
    .from(project)
    .where(eq(project.title, title))
    .limit(1)
    .execute();

  if (existingProject) {
    const updatedTask = [...(existingProject.data as Task[]), tasks];

    return await db
      .update(project)
      .set({ data: updatedTask })
      .where(eq(project.title, title))
      .execute();
  }

  return await db
    .insert(project)
    .values({
      title,
      userId,
      data: tasks,
    })
    .execute();
};

export const createTask = async ({
  projectId,
  task,
}: {
  projectId: number;
  task: Task;
}) => {
  const [existingProject] = await db
    .select()
    .from(project)
    .where(eq(project.id, projectId))
    .execute();

  if (!existingProject) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Project Not found`,
    });
  }

  const updatedTask = [...(existingProject.data as Task[]), task];

  await db
    .update(project)
    .set({ data: updatedTask })
    .where(eq(project.id, projectId))
    .execute();
};
