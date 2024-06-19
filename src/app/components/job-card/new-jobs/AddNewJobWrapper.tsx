import React from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import NewJobForm from "./NewJobForm";

const AddNewJobWrapper = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"normal"} size="lg">
          + Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <NewJobForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewJobWrapper;
