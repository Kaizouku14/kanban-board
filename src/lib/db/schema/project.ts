import { jsonb, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const project = pgTable("projects", { 
    id: serial("id").primaryKey(),
    title: text("project_name").notNull(),
    userId: text("user_id").references(() => users.id),
    data: jsonb("project_data").notNull(),
})

export type projectTable = typeof project;