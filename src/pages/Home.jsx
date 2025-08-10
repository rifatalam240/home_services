import React from "react";
import Banner from "./Banner";
import Popularservice from "../dashboard/Popularservice";
import WhyChooseUs from "../extrasection/WhyChooseUs";
import HowItWorks from "../extrasection/HowItWorks";
import FAQ from "../extrasection/FAQ";
import StatsSection from "../extrasection/StatsSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Popularservice></Popularservice>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
      <StatsSection></StatsSection>
    </div>
  );
};

export default Home;
