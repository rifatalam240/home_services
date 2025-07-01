import React, { useEffect, useState } from "react";
import { useAllContext } from "../context/AllContext";
import Loading_spinner from "../loading-sppiner/Loading";

const BookedServices = () => {
  const { user, loading } = useAllContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `https://b11a11-server-side-rifatalam240.vercel.app/showbookingservice?email=${user?.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  if (loading) return <Loading_spinner />;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br mt-20 from-blue-50 to-white">
      <h2 className="text-2xl font-bold mb-4 text-[#e3006e] text-center">
        My Booked Services
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have not booked any service yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border-l-8 border-[#e3006e] rounded-xl shadow-lg p-5 flex flex-col gap-2 hover:shadow-2xl transition relative"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={booking.serviceImage}
                  alt={booking.serviceName}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-[#e3006e] shadow"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#e3006e]">
                    {booking.serviceName}
                  </h3>
                  <div className="text-xs text-green-700 font-semibold uppercase tracking-wider">
                    {booking.serviceStatus}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold text-gray-700">Provider:</span>
                <span className="text-[#e3006e] font-semibold">
                  {booking.providerName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <span className="font-semibold text-gray-700">Date:</span>
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="font-semibold text-gray-700">Price:</span>
                <span className="text-green-700 font-bold">
                  ৳{booking.price}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-1">
                <span className="font-semibold">Instruction:</span>{" "}
                {booking.instruction}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedServices;
