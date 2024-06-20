import React from "react";
import { type JobApplication } from "~/helpers/types";

interface IJobCardProps {
  job: JobApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  return (
    <div className="flex w-[160px] flex-col flex-wrap items-center rounded-xl border border-black">
      <p className="font-semibold ">{job.title}</p>
      <p className="">{job.company}</p>
      <p className="">
        {job.isRemote
          ? "Remote"
          : job.isUSBased
            ? `${job.city}, ${job.state}`
            : `${job.city}, ${job.country}`}
      </p>
    </div>
  );
};

export default JobCard;
