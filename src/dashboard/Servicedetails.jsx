import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAllContext } from "../context/AllContext";

const Servicedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAllContext();

  const [service, setService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/service/${id}`
        );
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load service details.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("modal") === "true") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [location.search]);

  const today = new Date().toISOString().split("T")[0];

  const openModal = () => {
    setShowModal(true);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("modal", "true");
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  const closeModal = () => {
    setShowModal(false);
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("modal");
    navigate({ search: queryParams.toString() }, { replace: true });
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire(
        "Unauthorized",
        "Please login to book this service.",
        "warning"
      );
    }

    const booking = {
      serviceId: service._id,
      serviceName: service.serviceName,
      serviceImage: service.serviceImage,
      providerEmail: service.providerEmail,

      providerName: service.providerName,
      userEmail: user?.email,
      userName: user?.displayName,
      date,
      instruction,
      price: service.price,
      serviceStatus: "pending",
    };

    try {
      const res = await fetch(
        "https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/servicebooking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        }
      );
      const result = await res.json();
      if (result.insertedId || result.acknowledged) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Booked Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong during booking.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#e3006e]"></span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Service not found or an error occurred.
      </div>
    );
  }

  return (
    <section className="py-10 pt-20 px-2 md:px-8 lg:px-32min-h-screen">
      {/* Provider Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={service.providerImage}
          alt={service.providerName}
          className="w-16 h-16 rounded-full border-2 border-[#e3006e] shadow"
        />
        <div>
          <div className="text-lg font-semibold text-[#e3006e]">
            {service.providerName}
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <FaMapMarkerAlt /> {service.serviceArea}
          </div>
        </div>
      </div>

      {/* Service Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#e3006e30] flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-3xl mx-auto">
        <img
          src={service.serviceImage}
          alt={service.serviceName}
          className="w-full md:w-80 h-60 object-cover"
        />
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <h3 className="font-bold text-2xl text-[#e3006e] mb-2">
              {service.serviceName}
            </h3>
            <p className="text-gray-700 text-sm mb-4">{service.description}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={service.providerImage}
              alt={service.providerName}
              className="w-12 h-12 rounded-full border-2 border-[#e3006e] shadow"
            />
            <span className="text-base font-semibold text-[#e3006e]">
              {service.providerName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#e3006e] font-bold text-xl">
              <span className="text-green-600">৳</span>
              {service.price}
            </span>
            <button
              className="btn btn-sm bg-[#e3006e] text-white border-none hover:bg-green-600 transition rounded-md font-semibold tracking-wide shadow-sm"
              onClick={openModal}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
          <form
            onSubmit={handleBook}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              type="button"
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-[#e3006e]"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#e3006e]">
              Book Service
            </h2>
            <div className="space-y-2 text-sm">
              <input
                className="input input-bordered w-full"
                value={service._id}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={service.serviceName}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={service.serviceImage}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={service.providerEmail}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={service.providerName}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={user?.email || ""}
                disabled
                readOnly
              />
              <input
                className="input input-bordered w-full"
                value={user?.displayName || ""}
                disabled
                readOnly
              />

              <div>
                <label className="font-semibold">Service Taking Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  required
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold">Special Instruction</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Address, area, or any special request"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  rows={2}
                ></textarea>
              </div>

              <input
                className="input input-bordered w-full"
                value={service.price}
                disabled
                readOnly
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 bg-[#e3006e] border-none hover:bg-blue-700"
            >
              Purchase
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Servicedetails;
