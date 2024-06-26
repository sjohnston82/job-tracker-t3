import React from "react";
import { type JobApplication } from "~/helpers/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import MapMarker from "../../../../public/images/map-marker.svg";
import { capitalizeFirstLetter } from "~/helpers/string-functions";
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

//  const capitalizeFirstLetter = (input: string) => {
//    const splitWords = input.split(" ");

//    const capitalizedWords: string[] = [];

//    splitWords.forEach((word) => {
//      word.split("");
//      const combined = word[0]?.toUpperCase() + word.substring(1);

//      capitalizedWords.push(combined);
//    });
  

//    return capitalizedWords;
//  };

  console.log(capitalizeFirstLetter("the home depot"));

  return (
    <div className="flex  min-h-[200px] min-w-[240px] max-w-[240px] flex-col flex-wrap items-center gap-2 rounded-xl border border-black shadow-lg shadow-black">
      <div className="flex flex-col items-center gap-2 p-2">
        <p className="flex h-10 items-center text-center text-lg font-bold">
          {job.title}
        </p>
        <p className="text-center font-semibold italic">{job.company}</p>
        <div className="flex gap-1">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={MapMarker}
            height={20}
            width={20}
            alt="Map marker icon"
          />
          <p className="">
            {job.isRemote
              ? "Remote"
              : job.isUSBased
                ? `${job.city}, ${job.state}`
                : `${job.city}, ${job.country}`}
          </p>
        </div>
        <p className=" ">Applied: {job.dateAppliedReadable}</p>
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
            <DialogContent className="max-h-screen max-w-[300px] overflow-y-scroll rounded-xl">
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
