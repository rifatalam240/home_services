import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useAllContext } from "../context/AllContext";
import Loading_spinner from "../loading-sppiner/Loading";
import { NavLink } from "react-router";

const Banner = () => {
  const { loading, setLoading } = useAllContext();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    // Debounce logic: 300ms পরে fetch চালাবে
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      fetch(
        `https://service-sharing-server-bay.vercel.app/search?searchparams=${search}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Search fetch error:", error);
          setLoading(false);
        });
    }, 300);

    // Cleanup on unmount
    return () => clearTimeout(debounceTimeout.current);
  }, [search, setLoading]);

  return (
    <div
      className="relative bg-cover bg-top h-[80vh] w-full"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/LXmkDxhH/portrait-happy-smiling-family-repairing-260nw-2181215119.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Your Personal Assistant
        </h1>
        <p className="text-lg md:text-2xl">
          One-stop solution for your services. Order any service, anytime.
        </p>

        {/* Search Box */}
        <div className="mt-5">
          <div className="flex justify-center items-center bg-white rounded-sm py-1 px-2 w-[300px] md:w-[500px] space-x-2">
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for home repair services..."
              className="input input-bordered w-full bg-white text-blue-600"
            />
            <div className="bg-pink-800 p-2 rounded-sm text-white">
              <FaSearch />
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-4">
            <Loading_spinner />
          </div>
        )}

        {/* Search Results */}
        {results.length > 0 && !loading && (
          <div className="bg-white text-black mt-6 p-4 rounded-lg w-[300px] md:w-[500px] max-h-60 overflow-y-auto shadow-md">
            {results.map((item) => (
              <div
                key={item._id}
                className="p-2 border-b flex justify-between items-center"
              >
                <span>{item.serviceName}</span>
                <NavLink
                  to={`/servicedetail/${item._id}`}
                  className="text-sm text-blue-600 underline"
                >
                  Details
                </NavLink>
              </div>
            ))}
          </div>
        )}

        {/* No Results Found */}
        {search && !loading && results.length === 0 && (
          <div className="text-white mt-4">
            No services matched your search.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Banner;
