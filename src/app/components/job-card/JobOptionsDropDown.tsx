"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ArrowBigUp,
  EllipsisVertical,
  Pencil,
  Trash2,
  Package,
  FolderOpen,
} from "lucide-react";
import { type JobApplication } from "~/lib/helpers/types";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import { api } from "~/lib/helpers/api";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import UpdateApplicationStatus from "./UpdateApplicationStatus";

interface IJobCardProps {
  job: JobApplication;
}

const JobOptionsDropDown = ({ job }: IJobCardProps) => {
  const { startIsEditing } = useJobInfoStore();

  const utils = api.useUtils();

  const deleteJobApplication =
    api.jobApplicationsRouter.deleteJobApplication.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (error) => console.log(error),
    });

  const deleteJob = () => deleteJobApplication.mutate({ id: job.id });

  const archiveJobApplication =
    api.jobApplicationsRouter.toggleArchiveJobApplication.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (error) => console.log(error),
    });

  const archiveJob = () => archiveJobApplication.mutate({ id: job.id });

  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);

  const [stageOfApplicationDialogOpen, setStateOfApplicationDialogOpen] =
    useState(false);

  const openDeleteConfirmationDialog = () =>
    setDeleteConfirmationDialogOpen(true);
  const closeDeleteConfirmationDialog = () =>
    setDeleteConfirmationDialogOpen(false);

  const openStageOfApplicationDialog = () =>
    setStateOfApplicationDialogOpen(true);
  const closeStageOfApplicationDialog = () =>
    setStateOfApplicationDialogOpen(false);

  return (
    <>
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
            <DropdownMenuItem onClick={openStageOfApplicationDialog}>
              <ArrowBigUp className="mr-2 h-4 w-4" fill="green" />
              <span className="cursor-pointer hover:font-bold hover:duration-100">
                Upgrade App Status
              </span>
            </DropdownMenuItem>

            {!job.isArchived ? (
              <DropdownMenuItem onClick={archiveJob}>
                <Package className="mr-2 h-4 w-4" />
                <span className="cursor-pointer hover:font-bold hover:duration-100">
                  Archive
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={archiveJob}>
                <FolderOpen className="mr-2 h-4 w-4" />
                <span className="cursor-pointer hover:font-bold hover:duration-100">
                  Unarchive
                </span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={openDeleteConfirmationDialog}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="cursor-pointer hover:font-bold hover:duration-100">
                Delete Job App
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={deleteConfirmationDialogOpen}
        onOpenChange={setDeleteConfirmationDialogOpen}
      >
        <DialogContent className="w-2/3 rounded-2xl">
          <p>Are you sure you want to delete this job application?</p>
          <div className=" m-auto flex justify-around gap-10">
            <Button variant="outline" onClick={closeDeleteConfirmationDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteJob();
                closeDeleteConfirmationDialog();
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={stageOfApplicationDialogOpen}
        onOpenChange={setStateOfApplicationDialogOpen}
      >
        <DialogContent className="w-[300px] rounded-2xl">
          <UpdateApplicationStatus job={job} closeStageOfApplicationDialog={closeStageOfApplicationDialog}  />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobOptionsDropDown;
