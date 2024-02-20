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
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `job-tracker-t3_${name}`);

export const posts = createTable("jobApplication", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }),
  dateApplied: timestamp("dateApplied")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  dateAppliedReadable: varchar("dateAppliedReadable", { length: 255 }),
  daysSinceInitialSubmission: integer("daysSinceInitialSubmission"),
  jobURL: varchar("jobURL", { length: 255 }),
  jobSource: varchar("jobSource", { length: 255 }),
  postedSalary: varchar("postedSalary", { length: 255 }),
  postedSalaryType: varchar("postedSalaryType", { length: 255 }),
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
  owner: varchar("owner", { length: 255 }).notNull(),
  jobType: varchar("jobType", { length: 255 }),
  isRemote: boolean("isRemote"),
  country: varchar("country", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
});

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  username: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  avatar: varchar("image", { length: 255 }),
  sub: varchar("sub", { length: 255 }),
  displayName: varchar("displayName", { length: 255 }),
  date: timestamp("date").default(sql`CURRENT_TIMESTAMP`),
  autoArchive: boolean("autoArchive").default(true),
});
