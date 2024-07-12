import { eq } from "drizzle-orm";
import { z } from "zod";
import { uuid } from "uuidv4";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { jobApplications, users } from "~/server/db/schema";
import { formatDate } from "~/helpers/date-functions";
import { capitalizeFirstLetter } from "~/helpers/string-functions";

type JobApplication = typeof jobApplications.$inferInsert;

export const jobApplicationsRouter = createTRPCRouter({
  getAllJobs: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;

      const user = await db.select().from(users).where(eq(users.id, userId));

      if (user.length === 0) {
        throw new Error("User not found");
      }

      const currentUser = user[0];
      if (!currentUser?.id) {
        throw new Error("User ID is undefined");
      }

      try {
        const jobs = await db
          .select()
          .from(jobApplications)
          .where(eq(jobApplications.owner, currentUser.id));

        if (!jobs) {
          return "There are no jobs added yet.  You must add a job.";
        } else {
          return jobs;
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
        throw new Error("Unable to fetch job applications");
      }
    }),

  createJobApplication: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        title: z.string(),
        company: z.string(),
        isRemote: z.boolean(),
        isUSBased: z.boolean(),
        isOutsideUS: z.boolean(),
        country: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        jobURL: z.string().optional(),
        dateApplied: z.date(),
        jobSource: z.string().optional(),
        salary: z.string().optional(),
        salaryType: z.string().optional(),
        // levelOfInterest: z.string().optional(),
        // resume: z.boolean(),
        // resumeUploadURL: z.string().optional(),
        // coverLetter: z.boolean(),
        // coverLetterUploadURL: z.string().optional(),
        // project: z.boolean(),
        // projectURL: z.string().optional(),
        // projectLink: z.string().optional(),
        jobType: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        owner,
        title,
        company,
        isRemote,
        isUSBased,
        isOutsideUS,
        country,
        city,
        state,
        jobURL,
        dateApplied,
        salary,
        salaryType,
        jobType,
        jobSource,
      } = input;

      const newID = uuid();

      const formattedDate = formatDate(dateApplied);
      const transformedTitle = capitalizeFirstLetter(title);
      const transformedCompany = capitalizeFirstLetter(company);
      const transformedCountry = country
        ? capitalizeFirstLetter(country)
        : null;
      const transformedState = state ? capitalizeFirstLetter(state) : null;
      const transformedCity = city ? capitalizeFirstLetter(city) : null;
      const transformedJobType = jobType
        ? capitalizeFirstLetter(jobType)
        : null;
      const transformedJobSource = jobSource
        ? capitalizeFirstLetter(jobSource)
        : null;

      const newJobSource = "Career Page";

      const newJobApp: JobApplication = {
        id: newID,
        owner,
        title: transformedTitle,
        company: transformedCompany,
        isRemote,
        isUSBased,
        isOutsideUS,
        country: transformedCountry,
        city: transformedCity,
        state: transformedState,
        jobURL,
        dateApplied,
        dateAppliedReadable: formattedDate,
        stageOfApplication: 0,
        salary,
        salaryType,
        jobType:
          jobType === "fullTime"
            ? "Full-Time"
            : jobType === "partTime"
              ? "Part-Time"
              : transformedJobType,
        jobSource:
          jobSource === "careerPage" ? newJobSource : transformedJobSource,
      };

      const createJobApp = async (job: JobApplication) => {
        return db.insert(jobApplications).values(job);
      };

      await createJobApp(newJobApp);
    }),

  editJobApplication: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        owner: z.string(),
        title: z.string(),
        company: z.string(),
        isRemote: z.boolean(),
        isUSBased: z.boolean(),
        isOutsideUS: z.boolean(),
        country: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        jobURL: z.string().optional(),
        dateApplied: z.date(),
        jobSource: z.string().optional(),
        salary: z.string().optional(),
        salaryType: z.string().optional(),
        // levelOfInterest: z.string().optional(),
        // resume: z.boolean(),
        // resumeUploadURL: z.string().optional(),
        // coverLetter: z.boolean(),
        // coverLetterUploadURL: z.string().optional(),
        // project: z.boolean(),
        // projectURL: z.string().optional(),
        // projectLink: z.string().optional(),
        jobType: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const {
        id,
        title,
        owner,
        company,
        isRemote,
        isUSBased,
        isOutsideUS,
        country,
        city,
        state,
        jobURL,
        dateApplied,
        salary,
        salaryType,
        jobType,
        jobSource,
      } = input;

      const currentJob = await db
        .select()
        .from(jobApplications)
        .where(eq(jobApplications.id, id));

      await db
        .update(jobApplications)
        .set({
          title: title,
          owner: owner,
          company: company,
          isRemote: isRemote,
          isUSBased: isUSBased,
          isOutsideUS: isOutsideUS,
          country: country,
          city: city,
          state: state,
          jobURL: jobURL,
          salary: salary,
          salaryType: salaryType,
          jobType: jobType,
          jobSource: jobSource,
        })
        .where(eq(jobApplications.id, id));

      return currentJob;
    }),

  deleteJobApplication: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      await db
        .delete(jobApplications)
        .where(eq(jobApplications.id, id))
        .returning();
    }),
});
