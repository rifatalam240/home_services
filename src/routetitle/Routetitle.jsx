import React, { useEffect } from "react";
import { useLocation } from "react-router";

const Routetitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pathtilte = {
      "/": "Home | Service sharing",
      "/allservice": "Allservice | Service sharing",
      "/addservice": "Addservice | Service sharing",
      "/manageservice": "Manageservice | Service sharing",
      "/bookedservice": "Bookedservice | Service sharing",
      "/todoservice": "ToDoservice | Service sharing",
      "/login": "Login | Service sharing",
      "/signup": "Signup | Service sharing",
    };
    document.title = pathtilte[location.pathname] || "Service Sharing";
  }, [location]);
  return null;
};

export default Routetitle;
