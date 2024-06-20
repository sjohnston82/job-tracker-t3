import { create } from "zustand";
import { type JobApplication } from "~/helpers/types";

interface IJobAppStore {
  totalJobs: JobApplication[];
  activeJobs: JobApplication[];
  archivedJobs: JobApplication[];
  setTotalJobs: (value: JobApplication[]) => void;
}

export const useJobAppStore = create<IJobAppStore>((set) => ({
  totalJobs: [],
  activeJobs: [],
  archivedJobs: [],
  setTotalJobs: (value: JobApplication[]) => {
    const activeJobs = value.filter((job) => !job.isArchived);
    const archivedJobs = value.filter((job) => job.isArchived);

    set({
      totalJobs: value,
      activeJobs: activeJobs,
      archivedJobs: archivedJobs,
    });
  },
}));
