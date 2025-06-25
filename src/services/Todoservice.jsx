// ServiceToDo.jsx
import React, { useEffect, useState } from "react";
import { useAllContext } from "../context/AllContext";
import Swal from "sweetalert2";

const ServiceToDo = () => {
  const { user } = useAllContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToDoServices = async () => {
      try {
        const res = await fetch(
          `https://service-sharing-server-bay.vercel.app/servicetodo?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchToDoServices();
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://service-sharing-server-bay.vercel.app/bookingstatus/${id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ serviceStatus: newStatus }),
        }
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        Swal.fire("Updated!", "Service status has been updated.", "success");
        setServices((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, serviceStatus: newStatus } : s
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mt-20  mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-left py-5">
        Services You Need To Do
      </h2>
      {services.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no booked service to do.
        </p>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service._id} className="border p-4 rounded-lg shadow">
              <div className="flex gap-4">
                <img
                  src={service.serviceImage}
                  alt={service.serviceName}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {service.serviceName}
                  </h3>
                  <p>
                    <strong>Date:</strong> {service.date}
                  </p>
                  <p>
                    <strong>Price:</strong> ${service.price}
                  </p>
                  <p>
                    <strong>Booked by:</strong> {service.userName} (
                    {service.userEmail})
                  </p>
                  <p>
                    <strong>Special Instruction:</strong>{" "}
                    {service.specialInstruction}
                  </p>

                  <div className="mt-2">
                    <label className="mr-2 font-medium">Status:</label>
                    <select
                      value={service.serviceStatus}
                      onChange={(e) =>
                        handleStatusChange(service._id, e.target.value)
                      }
                      className="border rounded text-green-600 px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceToDo;
