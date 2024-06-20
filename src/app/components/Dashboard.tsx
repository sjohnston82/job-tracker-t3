import React from 'react'
import Searchbar from './Searchbar'
import DashboardButtonContainer from './dashobard-ui/DashboardButtonContainer'
import JobCardContainer from './job-card/JobCardWrapper'


const Dashboard = () => {
  return (
    <div>
      <div className="px-6">
      <Searchbar />
      </div>
      <div className=""><DashboardButtonContainer /></div>
      <JobCardContainer />
    </div>
  )
}

export default Dashboard