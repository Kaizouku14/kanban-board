import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sqlDb = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sqlDb });

export * from "drizzle-orm";
