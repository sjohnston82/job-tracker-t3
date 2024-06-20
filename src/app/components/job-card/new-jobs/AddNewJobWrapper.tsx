"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import NewJobForm from "./NewJobForm";

const AddNewJobWrapper = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"normal"} size="lg">
          + Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <NewJobForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewJobWrapper;
