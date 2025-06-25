import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAllContext } from "../context/AllContext";
import Loading_spinner from "../loading-sppiner/Loading";

const Privaterouter = ({ children }) => {
  const { user, loading } = useAllContext();
  const location = useLocation();
  if (loading) {
   return <Loading_spinner></Loading_spinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default Privaterouter;
