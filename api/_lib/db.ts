import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../../shared/schema";

let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
    db = drizzle(pool, { schema });
} else {
    console.warn("DATABASE_URL is not set. Database features will be disabled.");
}

export { db };
