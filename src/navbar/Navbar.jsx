import React, { useEffect, useState } from "react";
import { MdAddHomeWork } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import DashboardDropdown from "../dashboard/Dashboard";
import { useAllContext } from "../context/AllContext";
import Swal from "sweetalert2";
import { FaMoon, FaSun } from "react-icons/fa";

const links = (
  <>
    <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-8 lg:gap-x-12 items-center">
      <NavLink to="/">
        <li className="text-[#e3006e] font-bold border border-[#e3006e] px-3 py-2 rounded-sm hover:bg-[#e3006e] hover:text-white transition">
          Home
        </li>
      </NavLink>

      <NavLink to="/allservice">
        <li className="text-[#e3006e] font-bold border border-[#e3006e] px-3 py-2 rounded-sm hover:bg-[#e3006e] hover:text-white transition">
          Services
        </li>
      </NavLink>

      <DashboardDropdown />
    </div>
  </>
);
const Navbar = () => {
  const [showname, setShowname] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const { user, handlesignout } = useAllContext();
  console.log("photo url", user);

  const toggleName = () => {
    setShowname((prev) => !prev);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handlelogout = () => {
    handlesignout()
      .then(() => {
        navigate("/", { replace: true });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "logout Succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex gap-x-1">
          <MdAddHomeWork size={34} className="text-[#e3006e] " />
          <a className=" text-2xl font-bold ">
            <span className="text-green-700">Fix</span>
            <span>It</span>
            <span className="text-[#e3006e]">Now</span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex gap-x-4">
        {" "}
        <button
          className="btn btn-ghost btn-circle "
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-700 text-xl" />
          )}
        </button>
        {user ? (
          <div className="flex items-center justify-center gap-x-1">
            {" "}
            <a
              onClick={handlelogout}
              className="px-4 py-2 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
            >
              Sign Out
            </a>
            <div className="relative">
              <img
                onClick={toggleName}
                referrerPolicy="no-referrer"
                className="w-10 relative h-10 rounded-full object-cover border border-[#e3006e]"
                src={
                  user.photoURL ||
                  "https://i.postimg.cc/y8Qxys5w/67344e7acb7fb9001e44ae0b.jpg"
                }
                alt=""
              />
              {showname && (
                <div className="absolute mt-1 bg-base-200 text-sm px-3 py-1 rounded shadow-md z-50 left-[-50px] whitespace-nowrap">
                  {user.displayName || "User"}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <NavLink
              to="/login"
              className="text-[#e3006e] font-bold border border-[#e3006e] px-3 py-2 rounded-sm hover:bg-[#e3006e] hover:text-white transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
            >
              SignUp
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
