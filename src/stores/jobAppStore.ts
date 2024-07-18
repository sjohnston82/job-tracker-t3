

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
  | "company-desc";

type LocationFilter = "remote" | "usbased" | "outsideus" | "";

interface IJobAppStore {
  totalJobs: JobApplication[];
  activeJobs: JobApplication[];
  archivedJobs: JobApplication[];
  sortBy: SortBy;
  locationFilter: LocationFilter;
  setTotalJobs: (value: JobApplication[]) => void;
  setSortBy: (value: SortBy) => void;
  setLocationFilter: (value: LocationFilter) => void;
  sortAndFilterJobs: () => void;
}

export const useJobAppStore = create<IJobAppStore>((set, get) => ({
  totalJobs: [],
  activeJobs: [],
  archivedJobs: [],
  sortBy: "stageOfApplication-desc", // default
  locationFilter: "",

  setTotalJobs: (value: JobApplication[]) => {
    set({ totalJobs: value });
    get().sortAndFilterJobs();
  },

  setSortBy: (value: SortBy) => {
    set({ sortBy: value });
    get().sortAndFilterJobs();
  },

  setLocationFilter: (value: LocationFilter) => {
    set({ locationFilter: value });
    get().sortAndFilterJobs();
  },

  sortAndFilterJobs: () => {
    const { totalJobs, sortBy, locationFilter } = get();

    const sortedJobs = [...totalJobs];
    switch (sortBy) {
      case "stageOfApplication-desc":
        sortedJobs.sort((a, b) =>
          b.stageOfApplication! > a.stageOfApplication! ? 1 : -1,
        );
        break;
      case "stageOfApplication-asc":
        sortedJobs.sort((a, b) =>
          a.stageOfApplication! > b.stageOfApplication! ? 1 : -1,
        );
        break;
      case "dateApplied-desc":
        sortedJobs.sort(
          (a, b) =>
            new Date(b.dateApplied).getTime() -
            new Date(a.dateApplied).getTime(),
        );
        break;
      case "dateApplied-asc":
        sortedJobs.sort(
          (a, b) =>
            new Date(a.dateApplied).getTime() -
            new Date(b.dateApplied).getTime(),
        );
        break;
      case "company-desc":
        sortedJobs.sort((a, b) => b.company!.localeCompare(a.company!));
        break;
      case "company-asc":
        sortedJobs.sort((a, b) => a.company!.localeCompare(b.company!));
        break;
      case "title-desc":
        sortedJobs.sort((a, b) => b.title!.localeCompare(a.title!));
        break;
      case "title-asc":
        sortedJobs.sort((a, b) => a.title!.localeCompare(b.title!));
        break;
      default:
        break;
    }

    let filteredJobs = sortedJobs;
    if (locationFilter) {
      filteredJobs = sortedJobs.filter((job) => {
        if (locationFilter === "remote") return job.isRemote;
        if (locationFilter === "usbased") return job.isUSBased;
        if (locationFilter === "outsideus") return job.isOutsideUS;
        return true;
      });
    }

    const activeJobs = filteredJobs.filter((job) => !job.isArchived);
    const archivedJobs = filteredJobs.filter((job) => job.isArchived);

    set({
      activeJobs: activeJobs,
      archivedJobs: archivedJobs,
    });
  },
}));