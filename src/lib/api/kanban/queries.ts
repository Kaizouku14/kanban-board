import { db } from "@/lib/db"
import { project } from "@/lib/db/schema/project"

export const getAllProjects = async () => {
    return await db.select().from(project);
}