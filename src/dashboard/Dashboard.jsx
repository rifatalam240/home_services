import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";

const DashboardDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // DOM element track করার জন্য

  // বাইরের click detect করার জন্য effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // বাইরের click হলে dropdown বন্ধ
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
      >
        Dashboard ▼
      </button>

      {open && (
        <ul className="absolute mt-2 w-56 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(false)} to="/addservice">
              Add Service
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(false)} to="/manageservice">
              Manage Service
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(false)} to="/bookedservice">
              Booked Services
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(false)} to="/todoservice">
              Service To Do
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboardDropdown;
