import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between px-2  navbar bg-blue-200 shadow-2xl py-10">
        {" "}
        <div className="flex gap-x-1">
          <MdAddHomeWork size={34} className="text-[#e3006e] " />
          <a className=" text-2xl font-bold ">
            <span className="text-green-700">Fix</span>
            <span>It</span>
            <span className="text-[#e3006e]">Now</span>
          </a>
        </div>
        <div>
          <p className=" text-[#e3006e] font-bold border border-[#e3006e] px-3 py-2 rounded-sm hover:bg-[#e3006e] hover:text-white transition ">
            FOLLOW ON WEBFLOW
          </p>
        </div>
      </div>
      <div className="md:flex md:justify-around md:py-5 bg-[#e3006e10] ">
        <div className="text-center  mt-3 mb-2 font-bold">
          &copy; {new Date().getFullYear()} Home Repair Hub.
          <br /> All rights reserved.
        </div>
        <div className="flex gap-x-10 justify-center mt-3 pl-6">
          <div>
            <p className="text-xl font-bold mb-3">Company</p>
            <p>About Us</p>
            <p>Press</p>
            <p>Support</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-3">Resources</p>
            <p>Promotion</p>
            <p>Inspiration</p>
            <p>Videos</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-3">Store</p>
            <p>View the store</p>
            <p>Forest Ui Kit</p>
            <p>Otto Template</p>
          </div>
          <div></div>
        </div>
        <div>
          <div className="text-center mt-3 mb-2 font-bold">
            Follow Our Socials
          </div>
          <div className="flex gap-x-5 justify-center pb-3">
            {" "}
            <a
              className="rounded-full bg-green-400 shadow-2xl p-2"
              href="    https://www.facebook.com/muhammad.rifat.594290"
            >
              {" "}
              <FaFacebookF className="text-blue-700" />
            </a>
            <a
              className="rounded-full bg-green-400 shadow-2xl p-2"
              href="https://twitter.com/BillGates"
            >
              {" "}
              <FaTwitter className="text-blue-700" />
            </a>
            <a
              className="rounded-full bg-green-400 shadow-2xl p-2"
              href="https://www.linkedin.com/in/williamhgates
"
            >
              {" "}
              <FaLinkedinIn className="text-blue-700" />
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
