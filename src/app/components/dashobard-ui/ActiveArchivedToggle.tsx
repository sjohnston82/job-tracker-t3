"use client";

import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { cn } from "~/lib/utils";
import { useJobInfoStore } from "~/stores/jobInfoStore";

const ActiveArchivedToggle = () => {
  const { showingActive, toggleShowingActive } = useJobInfoStore();

  const handleToggleChange = () => {
    toggleShowingActive();
  };

  return (
    <div className="flex items-center gap-1">
      <p
        className={cn("w-12 text-center", {
          "font-bold": showingActive,
        })}
      >
        Active
      </p>
      <Switch onCheckedChange={handleToggleChange} />
      <p className={cn("w-12 text-center", { "font-bold": !showingActive })}>
        Archived
      </p>

    </div>
  );
};

export default ActiveArchivedToggle;
