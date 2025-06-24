import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function TrainingLayout() {
  const [editModeStatus, setEditModeStatus] = useState(false);

  return (
    <>
      <Outlet context={{ editModeStatus, setEditModeStatus }} />
    </>
  );
}

export default TrainingLayout;
