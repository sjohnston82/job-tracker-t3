"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Sort from "./Sort";
import { useJobAppStore } from "~/stores/jobAppStore";

const JobSortContainer = () => {
  const { sortBy, setSortBy } = useJobAppStore();
  const [open, setOpen] = useState(false)

  return (
    // todo: add dialog modal to open on sort button click
    <div className="flex justify-end px-4 py-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-full bg-light-gray px-8 py-2 font-basic text-xl font-semibold shadow-md shadow-slate-800">
            Sort
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Sort By
            </DialogTitle>
          </DialogHeader>
          <Sort setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobSortContainer;
