import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../../pages/HomePage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default MainRoutes;
