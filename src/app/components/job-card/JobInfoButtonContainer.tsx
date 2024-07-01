import React from "react";
import { type JobApplication } from "~/helpers/types";
import { Button } from "../ui/button";
import Image from "next/image";
import GreenArrow from "../../../../public/images/green-arrow-up.svg";

interface IJobInfoButtonContainerProps {
  job: JobApplication;
}

const JobInfoButtonContainer = ({ job }: IJobInfoButtonContainerProps) => {
  return (
    <div className="">
      <Button variant="outline">
        <span className="flex gap-1">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={GreenArrow}
            width={20}
            height={20}
            alt="Upgrade stage arrow"
          />{" "}
          Upgrade Stage
        </span>
      </Button>
      <Button variant="normal">Edit</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
};

export default JobInfoButtonContainer;
