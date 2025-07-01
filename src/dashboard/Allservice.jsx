import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const Allservice = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://b11a11-server-side-rifatalam240.vercel.app/allservice")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-10 px-2 md:px-8 lg:px-32 ">
      {/* bg-gradient-to-br from-blue-50 to-white min-h-screen */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#e3006e] mb-8">
        All Services
      </h2>
      <div className="flex flex-col gap-8 max-w-2xl mx-auto">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg border border-[#e3006e30] flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={service.serviceImage}
              alt={service.serviceName}
              className="w-full md:w-64 h-56 object-cover"
            />
            <div className="flex-1 flex flex-col justify-between p-6">
              <div>
                <h3 className="font-bold text-xl text-[#e3006e] mb-1">
                  {service.serviceName}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {service.description?.length > 100
                    ? service.description.slice(0, 100) + "..."
                    : service.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={service.providerImage}
                    alt={service.providerName}
                    className="w-16 h-16 rounded-full border-2 border-[#e3006e] shadow"
                  />
                  <span className="text-base font-semibold text-[#e3006e]">
                    {service.providerName}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs bg-[#e3006e10] text-[#e3006e] px-3 py-1 rounded font-semibold">
                  <FaMapMarkerAlt className="text-green-600 text-base" />
                  {service.serviceArea}
                </span>
                <span className="text-[#e3006e] font-bold text-lg">
                  <span className="text-green-600">৳</span>
                  {service.price}
                </span>
              </div>
              <NavLink to={`/servicedetail/${service._id}`}>
                <button className="btn btn-sm mt-6 bg-[#e3006e] text-white border-none hover:bg-blue-600 transition w-full rounded-md font-semibold tracking-wide shadow-sm">
                  View Detail
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Allservice;
