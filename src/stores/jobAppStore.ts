import { create } from "zustand";
import { type JobApplication } from "~/helpers/types";

type SortBy =
  | "stageOfApplication-asc"
  | "stageOfApplication-desc"
  | "dateApplied-asc"
  | "dateApplied-desc"
  | "title-asc"
  | "title-desc"
  | "company-asc"
  | "company-desc"
  | "salary-asc"
  | "salary-desc";

interface IJobAppStore {
  totalJobs: JobApplication[];
  activeJobs: JobApplication[];
  archivedJobs: JobApplication[];
  sortBy: SortBy;
  setTotalJobs: (value: JobApplication[]) => void;
  setSortBy: (value: SortBy) => void;
  sortJobs: (jobs: JobApplication[], sortBy: SortBy) => JobApplication[];
}

export const useJobAppStore = create<IJobAppStore>((set, get) => ({
  totalJobs: [],
  activeJobs: [],
  archivedJobs: [],
  sortBy: "stageOfApplication-desc", // default
  setTotalJobs: (value: JobApplication[]) => {
    const { sortBy, sortJobs } = get();
    const sortedJobs = sortJobs(value, sortBy);
    const activeJobs = sortedJobs.filter((job) => !job.isArchived);
    const archivedJobs = sortedJobs.filter((job) => job.isArchived);

    set({
      totalJobs: sortedJobs,
      activeJobs: activeJobs,
      archivedJobs: archivedJobs,
    });
  },

  setSortBy: (value: SortBy) => {
    const { totalJobs, sortJobs } = get();
    const sortedJobs = sortJobs(totalJobs, value);
    const activeJobs = sortedJobs.filter((job) => !job.isArchived);
    const archivedJobs = sortedJobs.filter((job) => job.isArchived);

    set({
      sortBy: value,
      totalJobs: sortedJobs,
      activeJobs: activeJobs,
      archivedJobs: archivedJobs,
    });
  },

  sortJobs: (jobs: JobApplication[], sortBy: SortBy) => {
    switch (sortBy) {
      case "stageOfApplication-desc":
        return jobs.sort((a, b) =>
          b.stageOfApplication! > a.stageOfApplication! ? 1 : -1,
        );
      case "stageOfApplication-asc":
        return jobs.sort((a, b) =>
          b.stageOfApplication! > a.stageOfApplication! ? -1 : 1,
        );
      case "dateApplied-desc":
        return jobs.sort(
          (a, b) =>
            new Date(b.dateApplied).getTime() -
            new Date(a.dateApplied).getTime(),
        );
      case "dateApplied-asc":
        return jobs.sort(
          (a, b) =>
            new Date(a.dateApplied).getTime() -
            new Date(b.dateApplied).getTime(),
        );
      case "company-desc":
        return jobs.sort((a, b) => b.company!.localeCompare(a.company!));
      case "company-asc":
        return jobs.sort((a, b) => a.company!.localeCompare(b.company!));
      case "title-desc":
        return jobs.sort((a, b) => b.title!.localeCompare(a.title!));
      case "title-asc":
        return jobs.sort((a, b) => a.title!.localeCompare(b.title!));
      case "salary-desc":
        return jobs.sort((a, b) => {
          const salaryA = a.salary ?? "";
          const salaryB = b.salary ?? "";

          return salaryB.localeCompare(salaryA);
        });
      case "salary-desc":
        return jobs.sort((a, b) => {
          const salaryA = a.salary ?? "";
          const salaryB = b.salary ?? "";

          return salaryA.localeCompare(salaryB);
        });
      default:
        return jobs;
    }
  },
}));
