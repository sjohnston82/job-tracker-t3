"use client";

import React, { useEffect } from "react";
import { api } from "~/lib/helpers/api";
import { useAuthStore } from "~/stores/authStore";
import { useJobAppStore } from "~/stores/jobAppStore";
import { useJobInfoStore } from "~/stores/jobInfoStore";

const JobCardAmount = () => {
  // const user = useAuthStore((state) => state.user);
  const { showingActive } = useJobInfoStore();
  const { activeJobs, archivedJobs } = useJobAppStore();

  // const { data, isLoading, error } =
  //   api.jobApplicationsRouter.getAllJobs.useQuery(
  //     { userId: user?.id ?? "", page: 1, totalItems: 2 }, // Ensure a valid user ID is passed
  //     {
  //       enabled: !!user?.id, // Only fetch if user ID is available
  //     },
  //   );

  // useEffect(() => {
  //   if (Array.isArray(data)) {
  //     setTotalJobs(data);
  //   }
  // }, [data, setTotalJobs]);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto text-center">
      <p className="text-lg font-bold">
        Showing {showingActive ? activeJobs?.length : archivedJobs?.length}{" "}
        {showingActive ? "Active" : "Archived"} Job Applications
      </p>
    </div>
  );
};

export default JobCardAmount;
