import React from "react";
import { Routes, Route } from "react-router";
import Dashbaord from "../../dashboard/page";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashbaord />} />
    </Routes>
  );
};

export default DashboardRoutes;
