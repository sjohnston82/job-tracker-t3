import React from 'react'
import JobCardAmount from './JobCardAmount'
import JobSortContainer from './JobSortContainer'
import JobCardContainer from './JobCardContainer'

const JobCardWrapper = () => {
  return (
    <div className=''>
      <JobCardAmount />
      <JobSortContainer />
      <JobCardContainer />
    </div>
  )
}

export default JobCardWrapper