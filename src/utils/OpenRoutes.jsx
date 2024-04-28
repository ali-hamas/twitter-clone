import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";

const OpenRoutes = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to={"/home"} />;
};

export default OpenRoutes;
