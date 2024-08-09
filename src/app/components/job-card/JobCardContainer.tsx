"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useJobAppStore } from "~/stores/jobAppStore";
import { useJobInfoStore } from "~/stores/jobInfoStore";
import JobCard from "./JobCard";
import { useAuthStore } from "~/stores/authStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { api } from "~/lib/helpers/api";
import { cn } from "~/lib/utils";

const JobCardContainer = () => {
  const {
    activeJobs,
    archivedJobs,
    setTotalJobs,
    totalActivePages,
    setTotalArchivedPages,
    totalArchivedPages,
    setTotalActivePages,
  } = useJobAppStore();
  const user = useAuthStore((state) => state.user);
  const { showingActive } = useJobInfoStore();
  const searchParams = useSearchParams();

  const DEFAULT_PAGE = 1;
  const DEFAULT_TOTAL_ITEMS = 1;

  const page = parseInt(searchParams.get("page") ?? `${DEFAULT_PAGE}`, 10);
  const totalItems = parseInt(
    searchParams.get("totalItems") ?? `${DEFAULT_TOTAL_ITEMS}`,
    10,
  );

  const { data, isLoading, error } =
    api.jobApplicationsRouter.getAllJobs.useQuery(
      {
        userId: user?.id ?? "",
        page: page < 1 ? DEFAULT_PAGE : page,
        totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
        showActive: showingActive
      }, // Ensure a valid user ID is passed
      {
        enabled: !!user?.id, // Only fetch if user ID is available
      },
    );

    useEffect(() => {
      if (data && typeof data !== "string") {
      
      
      setTotalJobs(data.jobs);
      setTotalActivePages(data.activePages);
      setTotalArchivedPages(data.archivedPages);
    }
  }, [data, setTotalActivePages, setTotalArchivedPages, setTotalJobs]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const nextHref = showingActive
    ? page < totalActivePages
      ? `?page=${page + 1}&totalItems=${totalItems}` 
      : `?page=${totalActivePages}&totalItems=${totalItems}` 
    : page < totalArchivedPages
      ? `?page=${page + 1}&totalItems=${totalItems}` 
      : `?page=${totalArchivedPages}&totalItems=${totalItems}`;

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-around gap-6 overflow-y-scroll px-4 pb-8">
      {showingActive
        ? activeJobs?.map((job) => <JobCard key={job.id} job={job} />)
        : archivedJobs?.map((job) => <JobCard key={job.id} job={job} />)}
      <p className="text-3xl">
        {showingActive ? totalActivePages : totalArchivedPages}
      </p>
      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={
                  page > 1
                    ? `?page=${page - 1}&totalItems=${totalItems}`
                    : `?page=1&totalItems=${totalItems}`
                }
                className={cn("", {
                  "cursor-default text-gray-300 hover:bg-transparent hover:text-gray-300":
                    page === 1,
                })}
              />
            </PaginationItem>
            {showingActive
              ? Array.from({ length: totalActivePages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`?page=${index + 1}&totalItems=${totalItems}`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              : Array.from({ length: totalArchivedPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`?page=${index + 1}&totalItems=${totalItems}`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={nextHref} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>                       
  );
};

export default JobCardContainer;
