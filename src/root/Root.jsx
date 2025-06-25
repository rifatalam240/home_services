import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";
import AllContextProvider from "../context/AllContext";
import Routetitle from "../routetitle/Routetitle";

const Root = () => {
  return (
    <div>
      <AllContextProvider>
        <Routetitle> </Routetitle>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </AllContextProvider>
    </div>
  );
};

export default Root;
