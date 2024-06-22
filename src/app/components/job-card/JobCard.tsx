import React from "react";
import { type JobApplication } from "~/helpers/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
// import JobInfo from "./JobInfo";

interface IJobCardProps {
  job: JobApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  const transformStageOfApplication = (stageOfApplication: number | null) => {
    switch (stageOfApplication) {
      case 0:
        return "Application Submitted";
      case 1:
        return "Recruiter Phone Interview";
      case 2:
        return "Technical Phone Interview";
      case 3:
        return "Onsite/Online Interview";
      case 4:
        return "Take-home Evaluataion";
      case 5:
        return "Offer Received!";
      default:
        return "Application Submitted";
    }
  };

  return (
    <div className="flex max-h-[200px] min-h-[200px] min-w-[160px] flex-col flex-wrap items-center gap-2 rounded-xl border border-black">
      <div className="flex flex-col items-center">
        <p className="font-semibold ">{job.title}</p>
        <p className="">{job.company}</p>
        <p className="">
          {job.isRemote
            ? "Remote"
            : job.isUSBased
              ? `${job.city}, ${job.state}`
              : `${job.city}, ${job.country}`}
        </p>
        <p className="">Applied: {job.dateAppliedReadable}</p>
        <p className="">Stage of Application:</p>
        <p className="">
          {transformStageOfApplication(job.stageOfApplication)}
        </p>
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"normal"} size="sm">
                More Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[300px] rounded-xl">
              <DialogHeader>
                <DialogTitle>{job.title}</DialogTitle>
              </DialogHeader>
              {/* <JobInfo job={job} /> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
