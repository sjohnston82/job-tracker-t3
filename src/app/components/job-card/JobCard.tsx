import React from "react";
import { type JobApplication } from "~/lib/helpers/types";
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
import { transformStageOfApplication } from "~/lib/helpers/string-functions";
import JobLinkButton from "./JobLinkButton";
import JobInfo from "./JobInfo";
import JobOptionsDropDown from "./JobOptionsDropDown";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import EditingJobInfo from "./EditingJobInfo";
// import JobInfo from "./JobInfo";

interface IJobCardProps {
  job: JobApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  const {
    isEditing,
    stopIsEditing,
    setLocationRadioSelection,
    setCity,
    setState,
    setCountry,
  } = useJobInfoStore();

  const modalCloseReset = () => {
    stopIsEditing();
    setLocationRadioSelection("remote");
    setCity("");
    setState("");
    setCountry("");
  };

  return (
    <div className="flex  min-h-[200px] min-w-[280px] max-w-[240px] flex-col flex-wrap items-center gap-2 rounded-xl border border-black shadow-lg shadow-black">
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
        <div className="relative flex justify-between gap-3">
          <Dialog onOpenChange={modalCloseReset}>
            <DialogTrigger asChild>
              <Button variant={"normal"} size="sm">
                More Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen  max-w-[320px] overflow-y-scroll rounded-xl">
              <DialogHeader>
                <DialogTitle className="">
                  {isEditing && "Editing Job App Info"}
                </DialogTitle>
              </DialogHeader>
              <div className=" absolute right-10 top-[14px]">
                <JobOptionsDropDown job={job} />
              </div>
              {isEditing ? (
                <EditingJobInfo job={job} modalCloseReset={modalCloseReset} />
              ) : (
                <JobInfo job={job} />
              )}
            </DialogContent>
          </Dialog>
          <JobLinkButton jobURL={job.jobURL!} />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
