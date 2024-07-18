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
  searchTerm: string;
  setTotalJobs: (value: JobApplication[]) => void;
  setSortBy: (value: SortBy) => void;
  setLocationFilter: (value: LocationFilter) => void;
  setSearchTerm: (value: string) => void;
  sortJobs: (jobs: JobApplication[], sortBy: SortBy) => JobApplication[];
  filterJobs: (
    jobs: JobApplication[],
    locationFilter: LocationFilter,
  ) => JobApplication[];
  applyFilters: () => void;
}

export const useJobAppStore = create<IJobAppStore>((set, get) => ({
  totalJobs: [],
  activeJobs: [],
  archivedJobs: [],
  sortBy: "stageOfApplication-desc", // default
  locationFilter: "",
  searchTerm: "",

  setTotalJobs: (value: JobApplication[]) => {
    set({ totalJobs: value });
    get().applyFilters();
  },

  setSortBy: (value: SortBy) => {
    set({ sortBy: value });
    get().applyFilters();
  },

  setLocationFilter: (value: LocationFilter) => {
    set({ locationFilter: value });
    get().applyFilters();
  },

  setSearchTerm: (value: string) => {
    set({ searchTerm: value });
    get().applyFilters();
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
      default:
        return jobs;
    }
  },

  filterJobs: (jobs: JobApplication[], locationFilter: LocationFilter) => {
    switch (locationFilter) {
      case "remote":
        return jobs.filter((job) => job.isRemote);
      case "usbased":
        return jobs.filter((job) => job.isUSBased);
      case "outsideus":
        return jobs.filter((job) => job.isOutsideUS);
      default:
        return jobs;
    }
  },

  applyFilters: () => {
    const {
      totalJobs,
      sortBy,
      locationFilter,
      searchTerm,
      sortJobs,
      filterJobs,
    } = get();
    const sortedJobs = sortJobs(totalJobs, sortBy);
    const filteredJobs = filterJobs(sortedJobs, locationFilter);
    const searchedJobs = filteredJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const activeJobs = searchedJobs.filter((job) => !job.isArchived);
    const archivedJobs = searchedJobs.filter((job) => job.isArchived);

    set({
      activeJobs: activeJobs,
      archivedJobs: archivedJobs,
    });
  },
}));
