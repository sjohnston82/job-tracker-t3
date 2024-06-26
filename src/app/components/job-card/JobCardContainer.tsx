"use client";

import React from "react";
import { useJobAppStore } from "~/stores/jobAppStore";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import JobCard from "./JobCard";
import { JobApplication } from "~/helpers/types";

const JobCardContainer = () => {
  const { activeJobs, archivedJobs } = useJobAppStore();
  const { showingActive } = useJobInfoStore();

  return (
    <div className="flex  w-full flex-wrap justify-around gap-6 overflow-y-scroll px-4">
      {showingActive
        ? activeJobs?.map((job) => <JobCard key={job.id} job={job} />)
        : archivedJobs?.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default JobCardContainer;
