import React from 'react'
import Searchbar from './Searchbar'
import DashboardButtonContainer from './dashobard-ui/DashboardButtonContainer'

const Dashboard = () => {
  return (
    <div>
      <div className="px-6">
      <Searchbar />
      </div>
      <div className=""><DashboardButtonContainer /></div>
    </div>
  )
}

export default Dashboard