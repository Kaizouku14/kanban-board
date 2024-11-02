import { Task } from "@/interface/ITask";
import { db, eq } from "@/lib/db";
import { project } from "@/lib/db/schema/project";
import { TRPCError } from "@trpc/server";

interface Project {
  title: string;
  userId?: string;
  tasks: Task[];
}

const fetchProject = async (projectId: number) => {
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

  return existingProject;
};

export const createProject = async ({ ...props }: Project) => {
  const { title, userId, tasks } = props;

  const [existingProject] = await db
    .select()
    .from(project)
    .where(eq(project.title, title))
    .limit(1)
    .execute();

  if (existingProject) {
    const updatedTasks = [...(existingProject.data as Task[]), ...tasks]; 

    return await db
      .update(project)
      .set({ data: updatedTasks })
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

export const deleteProject = async (projectId : number) => {
  const existingProject = await fetchProject(projectId);

  if(existingProject){
    await db
       .delete(project)
       .where(eq(project.id, projectId))
       .execute();
  }
}

export const createTask = async ({
  projectId,
  task,
}: {
  projectId: number;
  task: Task;
}) => {
  const existingProject = await fetchProject(projectId);
  
  const updatedTasks = [...(existingProject.data as Task[]), task];

  await db
    .update(project)
    .set({ data: updatedTasks })
    .where(eq(project.id, projectId))
    .execute();
};

export const savedChanges = async ({
  projectId,
  id,
  column,
}: {
  projectId: number;
  id: string;
  column: string;
}) => {
  const existingProject = await fetchProject(projectId);
  
  const updatedTasks = (existingProject.data as Task[]).map((task) => {
    if (task.id === id) {
      return { ...task, column };
    }
    return task;
  });

  await db
    .update(project)
    .set({ data: updatedTasks })
    .where(eq(project.id, projectId))
    .execute();
};

export const deleteTask = async ({
  projectId,
  taskId,
}: {
  projectId: number;
  taskId: string;
}) => {
  const existingProject = await fetchProject(projectId);

  console.log("taskId : ", taskId)
  
  const updatedTasks = (existingProject.data as Task[]).filter(task => task.id !== taskId);

  await db
    .update(project)
    .set({ data: updatedTasks })
    .where(eq(project.id, projectId))
    .execute();
};
