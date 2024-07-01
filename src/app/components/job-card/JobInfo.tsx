import React from "react";
import { type JobApplication } from "~/helpers/types";
import { transformStageOfApplication } from "~/helpers/string-functions";


interface IJobCardProps {
  job: JobApplication;
}

const JobInfo = ({ job }: IJobCardProps) => {
  const jobURLString =
    typeof job.jobURL === "string"
      ? job.jobURL
      : new URL(String(job.jobURL)).toString();

  const formattedJobURL =
    jobURLString.startsWith("http://") || jobURLString.startsWith("https://")
      ? jobURLString
      : `https://${jobURLString}`;

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2">
     

      <div className="w-full flex-col items-center justify-center gap-2 text-center">
        <p className="font-semibold underline ">Title: </p>
        <p className="w-full bg-light-gray">{job.title}</p>
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
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
