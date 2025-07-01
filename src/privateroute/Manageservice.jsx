import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAllContext } from "../context/AllContext";
import Swal from "sweetalert2";

const ManageServices = () => {
  const { user } = useAllContext();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://b11a11-server-side-rifatalam240.vercel.app/userservice?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setServices(data));
    }
  }, [user]);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidde";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedService = {
      serviceName: form.serviceName.value,
      serviceImage: form.serviceImage.value,
      price: parseFloat(form.price.value),
      serviceArea: form.serviceArea.value,

      description: form.description.value,
    };
    console.log("delete", user.accessToken);

    fetch(
      `https://b11a11-server-side-rifatalam240.vercel.app/updateservice/${editingService._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(updatedService),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Service updated successfully", "success");
          setServices((prev) =>
            prev.map((s) =>
              s._id === editingService._id ? { ...s, ...updatedService } : s
            )
          );
          setShowModal(false);
        } else {
          Swal.fire("Error", "No update occurred", "warning");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Update failed", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://b11a11-server-side-rifatalam240.vercel.app/deleteservice/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setServices(services.filter((service) => service._id !== id));
              Swal.fire(
                "Deleted!",
                "Your service has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error", "Failed to delete the service.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-left">
        Manage Your Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any services yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="h-36 w-full object-cover rounded-md mb-3"
              />

              <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-semibold text-black truncate">
                  {service.serviceName}
                </h3>
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  💰 {service.price} ৳
                </p>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  📍 {service.serviceArea}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
                {service.description || "No description provided."}
              </p>

              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setEditingService(service);
                    setShowModal(true);
                  }}
                  className="px-4 flex items-center gap-1 py-1 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
                >
                  <FaEdit size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-[#e3006e] font-bold border flex items-center gap-1 border-[#e3006e] px-3 py-1 rounded-sm hover:bg-[#e3006e] hover:text-white transition"
                >
                  <FaTrash size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed mt-2 pt-20 max-h-screen overflow-y-auto inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
            <h2 className="text-xl text-black font-semibold mb-4 text-left">
              Update Service
            </h2>
            <form onSubmit={handleUpdateSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm text-black font-medium mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  defaultValue={editingService?.serviceName}
                  required
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="block text-sm  text-black font-medium mb-1">
                  Service Image URL
                </label>
                <input
                  type="text"
                  name="serviceImage"
                  defaultValue={editingService?.serviceImage}
                  required
                  className="w-full border  text-black rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block  text-black text-sm font-medium mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingService?.price}
                  required
                  className="w-full border  text-black rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block  text-black text-sm font-medium mb-1">
                  Service Area
                </label>
                <input
                  type="text"
                  name="serviceArea"
                  defaultValue={editingService?.serviceArea}
                  required
                  className="w-full border  text-black rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block  text-black text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingService?.description}
                  rows={3}
                  required
                  className="w-full  text-black border rounded px-3 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4  text-black py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  rounded bg-[#e3006e] text-white hover:bg-pink-800 text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
