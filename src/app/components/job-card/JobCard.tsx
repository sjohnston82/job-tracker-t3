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
import { transformStageOfApplication } from "~/helpers/string-functions";
import Link from "next/link";
import { type Url } from "next/dist/shared/lib/router/router";
import JobLinkButton from "./JobLinkButton";
import JobInfo from "./JobInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2, ArrowBigUp } from "lucide-react";
// import JobInfo from "./JobInfo";

interface IJobCardProps {
  job: JobApplication;
}

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"normal"} size="sm">
                More Info
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen  max-w-[300px] overflow-y-scroll rounded-xl">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <div className=" absolute right-10 top-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* <Image src={EllipsisVerticalIcon} width={20} height={20} alt="Ellipsis" /> */}
                    <EllipsisVertical size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{`Options for ${job.title}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4 " />
                        <span className="cursor-pointer hover:font-bold hover:duration-100">
                          Edit Job Info
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="cursor-pointer hover:font-bold hover:duration-100">
                          Delete Job App
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowBigUp className="mr-2 h-4 w-4" fill="green" />
                        <span className="cursor-pointer hover:font-bold hover:duration-100">
                          Upgrade App Status
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <JobInfo job={job} />
            </DialogContent>
          </Dialog>
          <JobLinkButton jobURL={job.jobURL} />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
