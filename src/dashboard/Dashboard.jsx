import { useState } from "react";
import { NavLink } from "react-router";

const DashboardDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
      >
        Dashboard ▼
      </button>

      {open && (
        <ul className="absolute mt-2  w-56 bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(!open)} to="/addservice">
              Add Service
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(!open)} to="/manageservice">
              Manage Service
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(!open)} to="/bookedservice">
              Booked Services
            </NavLink>
          </li>
          <li className="px-4 py-2 text-gray-500 hover:bg-gray-100">
            <NavLink onClick={() => setOpen(!open)} to="/todoservice">
              Service To Do
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboardDropdown;
