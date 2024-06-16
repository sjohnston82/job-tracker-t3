"use client";

import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { cn } from "~/lib/utils";

const ActiveArchivedToggle = () => {
  const [viewingActive, setViewingActive] = useState(true);

  const handleToggleChange = () => {
    setViewingActive(!viewingActive);
  };

  return (
    <div className="flex items-center gap-1">
      <p
        className={cn("w-12 text-center", {
          "font-bold": viewingActive,
        })}
      >
        Active
      </p>
      <Switch onCheckedChange={handleToggleChange} />
      <p className={cn("w-12 text-center", { "font-bold": !viewingActive })}>
        Archived
      </p>
    </div>
  );
};

export default ActiveArchivedToggle;
