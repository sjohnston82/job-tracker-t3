import React from "react";

import ActiveArchivedToggle from "./ActiveArchivedToggle";
import AddNewJobWrapper from "../job-card/new-jobs/AddNewJobWrapper";

const DashboardButtonContainer = () => {
  return (
    <div className="flex items-center justify-between px-6 py-8">
      <AddNewJobWrapper />
      <ActiveArchivedToggle />
    </div>
  );
};

export default DashboardButtonContainer;
