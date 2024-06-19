import { type Config } from "drizzle-kit";

import { env } from "~/env.js";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["job-tracker-t3_*"],
} satisfies Config;
