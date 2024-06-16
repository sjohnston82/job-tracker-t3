import React from "react";
import { Button } from "../ui/button";

import ActiveArchivedToggle from "./ActiveArchivedToggle";

const DashboardButtonContainer = () => {
  return (
    <div className="flex items-center justify-between px-6 pt-8">
      <Button variant={"normal"} size="lg">
        + Add New
      </Button>
      <ActiveArchivedToggle />
    </div>
  );
};

export default DashboardButtonContainer;
