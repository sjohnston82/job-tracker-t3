import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  uuid,
  pgTable,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `job-tracker-t3_${name}`);

export const jobApplications = createTable("jobApplication", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  title: varchar("name", { length: 256 }),
  dateApplied: timestamp("dateApplied")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  dateAppliedReadable: varchar("dateAppliedReadable", { length: 255 }),
  daysSinceInitialSubmission: integer("daysSinceInitialSubmission"),
  jobURL: varchar("jobURL", { length: 255 }),
  jobSource: varchar("jobSource", { length: 255 }),
  salary: varchar("salary", { length: 255 }),
  salaryType: varchar("salaryType", { length: 255 }),
  levelOfInterest: varchar("levelOfInterest", { length: 255 }),
  resume: boolean("resume"),
  resumeUploadURL: varchar("resumeUploadURL", { length: 255 }),
  coverLetter: boolean("coverLetter"),
  coverLetterUploadURL: varchar("coverLetterUploadURL", { length: 255 }),
  project: boolean("project"),
  projectURL: varchar("projectURL", { length: 255 }),
  projectLink: varchar("projectLink", { length: 255 }),
  stageOfApplication: integer("stageOfApplication").default(0),
  notes: varchar("notes").array(),
  company: varchar("company", { length: 255 }),
  showingDetails: boolean("showingDetails").default(false),
  isArchived: boolean("isArchived").default(false),
  autoArchived: boolean("autoArchived").default(false),
  lastActivityDate: timestamp("lastActivityDate").default(
    sql`CURRENT_TIMESTAMP`,
  ),
  owner: varchar("owner", { length: 255 })
    .references(() => users.id)
    .notNull(),
  jobType: varchar("jobType", { length: 255 }),
  isRemote: boolean("isRemote"),
  isUSBased: boolean("isUSBased"),
  country: varchar("country", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
});

export const users = createTable("user", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  username: varchar("name", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified"),
  image: varchar("image", { length: 255 }),
  sub: varchar("sub", { length: 255 }),
  displayName: varchar("displayName", { length: 255 }),
  date: timestamp("date").default(sql`CURRENT_TIMESTAMP`),
  autoArchive: boolean("autoArchive").default(true),
  // passwordHash: text("passwordHash").notNull(),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .references(() => users.id)
      .notNull(),
    type: varchar("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = createTable("session", {
  // id: varchar("id", { length: 191 }).primaryKey(),
  sessionToken: text("sessionToken").notNull(),
  userId: varchar("userId", { length: 255 })
    .references(() => users.id)
    .notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const jobApplicationRelations = relations(
  jobApplications,
  ({ one }) => ({
    user: one(users, {
      fields: [jobApplications.owner],
      references: [users.id],
    }),
  }),
);

export const userRelations = relations(users, ({ many }) => ({
  jobApplications: many(jobApplications),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
