import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAllContext } from "../context/AllContext";
import { motion } from "framer-motion";

const Popularservice = () => {
  const { user } = useAllContext();
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  console.log("service", service);
  const handleviewdetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/servicedetail/${id}`);
    }
  };

  // const shortDescription =
  // service.description.split(" ").slice(0, 10).join(" ") + "...";
  useEffect(() => {
    fetch("https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/service")
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="py-10 px-2 md:px-8 lg:px-16 bg-base-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <motion.h2
          animate={{
            color: ["#335eff", "#ff3368", "#33ffc7", "#ff5b33", "#ff3349"],
            transition: { duration: 4, repeat: Infinity },
          }}
          className="text-2xl md:text-3xl font-bold text-[#e3006e]"
        >
          Popular Services
        </motion.h2>
        <button
          className="btn btn-outline btn-primary flex items-center gap-2"
          onClick={() => navigate("/allservice")}
        >
          <motion.span
            animate={{
              color: ["#335eff", "#ff3368", "#33ffc7", "#ff5b33", "#ff3349"],
              transition: { duration: 4, repeat: Infinity },
            }}
          >
            Show All{" "}
          </motion.span>
          <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {service.map((services, index) => (
          <div key={index} className="card bg-base-200 shadow-md">
            <figure className="w-full h-56">
              <img
                src={services.serviceImage}
                alt={services.serviceName}
                className="object-cover w-full h-full rounded-t-md"
              />
            </figure>
            <div className="card-body flex flex-col justify-between">
              <div>
                <h3 className="card-title text-lg font-semibold mb-2">
                  {services.serviceName}
                </h3>
                <p className="text-gray-400 mb-2">
                  {services.description.length > 40
                    ? services.description.slice(0, 40) + "..."
                    : services.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={services.providerImage}
                    alt={services.providerName}
                    className="w-12 h-12 rounded-full border"
                  />
                  <span className="text-sm font-bold">
                    {services.providerName}
                  </span>
                </div>
                <span className="text-primary font-bold text-lg">
                  ৳{services.price}
                </span>
              </div>
              <div className="mt-4">
                <motion.button
                  animate={{
                    color: [
                      "#ffffff", // white
                      "#fdfd96", // pastel yellow
                      "#00ffe7", // bright aqua
                      "#ffe600", // bright yellow
                      "#ccff00",
                    ],
                    transition: { duration: 4, repeat: Infinity },
                  }}
                  onClick={() => handleviewdetails(services._id)}
                  className="btn btn-sm bg-[#e3006e]  hover:bg-blue-700 hover:text-white transition-all w-full"
                >
                  View Detail
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popularservice;
