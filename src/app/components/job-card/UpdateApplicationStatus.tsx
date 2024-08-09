"use client";

import React, { useState } from "react";
import { type JobApplication } from "~/lib/helpers/types";
import { cn } from "~/lib/utils";
import { api } from "~/lib/helpers/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface IUpdateApplicationStatusProps {
  job: JobApplication;
  closeStageOfApplicationDialog: () => void;
}

const UpdateApplicationStatus = ({
  job,
  closeStageOfApplicationDialog,
}: IUpdateApplicationStatusProps) => {
  const [showingApptDialog, setShowingApptDialog] = useState(false);
  const [addingDate, setAddingDate] = useState(false);
  const [time, setTime] = useState<string>("");

  const utils = api.useUtils();

  const updateAppStatus =
    api.jobApplicationsRouter.updateApplicationStatus.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (err) => console.log(err),
    });

  const updateApplicationStatus = (stage: number) => {
    updateAppStatus.mutate({ id: job.id, updatedStage: stage });
    setShowingApptDialog(true);
  };

  const addAppointmentTime =
    api.jobApplicationsRouter.addAppointmentTime.useMutation({
      onSuccess: () => utils.invalidate(),
      onError: (err) => console.log(err),
    });

  const appointmentTimeMutation = (apptTime: string) => {
    addAppointmentTime.mutate({ id: job.id, appointmentTime: apptTime });
    closeStageOfApplicationDialog();
    console.log(apptTime)
  };

  const closeApptDateDialog = () => {
    setShowingApptDialog(false);
    closeStageOfApplicationDialog();
  };

  const openDatePickerDialog = () => {
    setAddingDate(true);
  };

  const closeDatePickerDialog = () => {
    setAddingDate(false);
    closeStageOfApplicationDialog();
  };

  return (
    <div className="flex flex-col py-8 ">
      <div
        className={cn(
          "cursor-pointer rounded-tl-lg rounded-tr-lg border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-blue-200 font-semibold hover:bg-blue-200":
              job.stageOfApplication === 0,
          },
        )}
        onClick={() => updateApplicationStatus(0)}
      >
        <p className="">Application Submitted</p>
      </div>
      <div
        className={cn(
          "cursor-pointer border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-blue-200 font-semibold hover:bg-blue-200":
              job.stageOfApplication === 1,
          },
        )}
        onClick={() => updateApplicationStatus(1)}
      >
        <p className="">Recruiter Phone Interview</p>
      </div>
      <div
        className={cn(
          "cursor-pointer border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-blue-200 font-semibold hover:bg-blue-200":
              job.stageOfApplication === 2,
          },
        )}
        onClick={() => updateApplicationStatus(2)}
      >
        <p className="">Technical Phone Interview</p>
      </div>
      <div
        className={cn(
          "cursor-pointer border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-blue-200 font-semibold hover:bg-blue-200":
              job.stageOfApplication === 3,
          },
        )}
        onClick={() => updateApplicationStatus(3)}
      >
        <p className="">Onsite/Online Interview</p>
      </div>
      <div
        className={cn(
          "cursor-pointer border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-blue-200 font-semibold hover:bg-blue-200":
              job.stageOfApplication === 4,
          },
        )}
        onClick={() => updateApplicationStatus(4)}
      >
        <p className="">Take-home Evaluation</p>
      </div>
      <div
        className={cn(
          "cursor-pointer rounded-bl-lg rounded-br-lg border py-2 text-center text-xl transition-all duration-300 hover:bg-slate-100 hover:font-semibold",
          {
            "bg-green-200": job.stageOfApplication === 5,
          },
        )}
        onClick={() => updateApplicationStatus(5)}
      >
        <p className="">Offer Received!</p>
      </div>
      <Dialog open={showingApptDialog} onOpenChange={setShowingApptDialog}>
        <DialogContent className="w-[300px] rounded-2xl">
          <p className="py-3 text-center font-semibold"></p>
          <p className="text-center">
            Would you like to add a date and time for your upcoming appointment?
          </p>
          <div className="flex items-center justify-around">
            <Button variant="outline" onClick={() => closeApptDateDialog()}>
              No
            </Button>
            <Button variant="outline" onClick={() => openDatePickerDialog()}>
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={addingDate} onOpenChange={() => closeDatePickerDialog()}>
        <DialogContent className="w-[300px] space-y-4 rounded-2xl">
          <p className="text-center font-semibold">Choose Appointment Time</p>
          <input
            aria-label="Date and time"
            type="datetime-local"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="cursor-pointer rounded-lg p-1 outline outline-1"
          />
          <div className="flex justify-around">
            <Button variant="destructive">Cancel</Button>
            <Button
              variant="default"
              onClick={() => appointmentTimeMutation(time)}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
};

export default UpdateApplicationStatus;
