import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowBigUp, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { type JobApplication } from "~/helpers/types";
import { useJobInfoStore } from "~/stores/jobInfoStore";

interface IJobCardProps {
  job: JobApplication;
}

const JobOptionsDropDown = ({ job }: IJobCardProps) => {
  const { startIsEditing } = useJobInfoStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`Options for ${job.title}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={startIsEditing}>
            <Pencil className="mr-2 h-4 w-4 " />
            <span className="cursor-pointer hover:font-bold hover:duration-100">
              Edit Job Info
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowBigUp className="mr-2 h-4 w-4" fill="green" />
            <span className="cursor-pointer hover:font-bold hover:duration-100">
              Upgrade App Status
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span className="cursor-pointer hover:font-bold hover:duration-100">
              Delete Job App
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JobOptionsDropDown;
