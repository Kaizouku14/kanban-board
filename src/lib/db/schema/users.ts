import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

const sqlDb = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sqlDb });

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type UserTable = typeof users;
export type SessionTable = typeof sessions;
export * from "drizzle-orm";
