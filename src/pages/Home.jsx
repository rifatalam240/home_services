import React from "react";
import Banner from "./Banner";
import Popularservice from "../dashboard/Popularservice";
import WhyChooseUs from "../extrasection/WhyChooseUs";
import HowItWorks from "../extrasection/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Popularservice></Popularservice>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
