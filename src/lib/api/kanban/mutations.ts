import { Task } from "@/interface/ITask";
import { db } from "@/lib/db";
import { project } from "@/lib/db/schema/project";

interface Project {
  title: string;
  userId? : string;
  tasks: Task[];
}

export const createProject = async ({ ...props }: Project) => {
    const { title , userId , tasks } = props;

    await db
      .insert(project)
      .values({
         title,
         userId,
         data : { projectData : tasks}
      })
};
