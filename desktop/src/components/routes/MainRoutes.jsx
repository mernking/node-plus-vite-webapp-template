import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../../pages/HomePage";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRoutes;
