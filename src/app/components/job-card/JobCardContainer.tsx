"use client"

import React from 'react'
import { useJobAppStore } from '~/stores/jobAppStore'
import { useJobInfoStore } from '~/stores/jobInfoStore';
import JobCard from './JobCard';
import { JobApplication } from '~/helpers/types';

const JobCardContainer = () => {

  const {activeJobs, archivedJobs} = useJobAppStore();
  const { showingActive } = useJobInfoStore();

  return (
    <div className="w-full flex flex-wrap justify-between gap-6 px-2">
      {showingActive
        ? activeJobs?.map((job) => <JobCard key={job.id} job={job} />)
        : archivedJobs?.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
}

export default JobCardContainer