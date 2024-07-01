import React from "react";
import { transformStageOfApplication } from "~/helpers/string-functions";
import { type JobApplication } from "~/helpers/types";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IEditingJobCardProps {
  job: JobApplication;
}

const editJobApplicationSchema = z.object({
  title: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  company: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." }),
  salary: z.string().optional(),
  jobURL: z.string().url(),
  city: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." })
    .optional(),
  country: z
    .string()
    .min(2, { message: "You need at least two characters" })
    .max(75, { message: "You have exceeded the characters amount." })
    .optional(),
  state: z.string().optional(),
  salaryType: z.string().optional(),
  jobType: z.string().optional(),
  jobSource: z.string().optional(),
});

const EditingJobInfo = ({ job }: IEditingJobCardProps) => {
  const jobURLString =
    typeof job.jobURL === "string"
      ? job.jobURL
      : new URL(String(job.jobURL)).toString();

  const formattedJobURL =
    jobURLString.startsWith("http://") || jobURLString.startsWith("https://")
      ? jobURLString
      : `https://${jobURLString}`;

  return (
    <form action="">
      <div className="relative flex w-full flex-col items-center justify-center gap-2">
        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline ">Title: </p>
          <input
            className="w-full border-b border-black bg-light-gray text-center placeholder:text-center"
            placeholder={job.title ?? ""}
          />
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Company: </p>
          <p className="w-full bg-light-gray">{job.company}</p>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Stage of Application: </p>
          <p className="w-full bg-light-gray">
            {transformStageOfApplication(job.stageOfApplication)}
          </p>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Location: </p>
          <p className="w-full bg-light-gray">
            {job.isRemote
              ? "Remote"
              : job.isUSBased
                ? `${job.city}, ${job.state}`
                : `${job.city}, ${job.country}`}
          </p>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Salary: </p>
          <div className="flex">
            {job.salary ? (
              <p className="w-full bg-light-gray">
                {`$${job.salary} / ${job.salaryType}`}
              </p>
            ) : (
              <p className="w-full bg-light-gray">No salary posted</p>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Type:</p>
            {job.jobType ? (
              <p className="w-full bg-light-gray">{job.jobType}</p>
            ) : (
              <p className="w-full bg-light-gray">Unknown</p>
            )}
          </div>
          <div className="w-full flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold underline">Job Source:</p>
            {job.jobSource ? (
              <p className="w-full bg-light-gray">{job.jobSource}</p>
            ) : (
              <p className="w-full bg-light-gray">Unknown</p>
            )}
          </div>
        </div>

        <div className="w-full flex-col items-center justify-center gap-2 text-center">
          <p className="font-semibold underline">Job Posting URL: </p>
          <div className="flex">
            <p className="w-full bg-light-gray">
              <a
                href={formattedJobURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Link
              </a>
            </p>
            <p className="">POOP</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditingJobInfo;
