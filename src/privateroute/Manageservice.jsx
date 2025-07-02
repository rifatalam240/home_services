import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaTable, FaThLarge } from "react-icons/fa";
import { useAllContext } from "../context/AllContext";
import Swal from "sweetalert2";

const ManageServices = () => {
  const { user } = useAllContext();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // default view

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/userservice?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setServices(data));
    }
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
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

    fetch(
      `https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/updateservice/${editingService._id}`,
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
          `https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/deleteservice/${id}`,
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
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-left">
          Manage Your Services
        </h2>
        <div className="flex gap-2">
          <button
            className={`btn btn-sm flex items-center gap-1 ${
              viewMode === "table" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setViewMode("table")}
          >
            <FaTable /> Table View
          </button>
          <button
            className={`btn btn-sm flex items-center gap-1 ${
              viewMode === "card" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setViewMode("card")}
          >
            <FaThLarge /> Card View
          </button>
        </div>
      </div>

      {/* No services message */}
      {services.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't added any services yet.
        </p>
      ) : viewMode === "table" ? (
        /* Table View */
        <div className="w-full overflow-x-auto">
          <table className="table w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr>
                <th>Image</th>
                <th>Service Name</th>
                <th>Price (৳)</th>
                <th>Area</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <img
                      src={service.serviceImage}
                      alt={service.serviceName}
                      className="h-14 w-20 object-cover rounded"
                    />
                  </td>
                  <td>{service.serviceName}</td>
                  <td>{service.price}</td>
                  <td>{service.serviceArea}</td>
                  <td>
                    <span className="line-clamp-2 block max-w-xs">
                      {service.description}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 flex items-center gap-1 bg-[#e3006e] text-white rounded hover:bg-blue-700 transition-all"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="h-40 w-full object-cover rounded-md mb-3"
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

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50 px-4 overflow-y-auto pt-10">
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
                <label className="block text-sm text-black font-medium mb-1">
                  Service Image URL
                </label>
                <input
                  type="text"
                  name="serviceImage"
                  defaultValue={editingService?.serviceImage}
                  required
                  className="w-full border text-black rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={editingService?.price}
                  required
                  className="w-full border text-black rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Service Area
                </label>
                <input
                  type="text"
                  name="serviceArea"
                  defaultValue={editingService?.serviceArea}
                  required
                  className="w-full border text-black rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-black text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingService?.description}
                  rows={3}
                  required
                  className="w-full text-black border rounded px-3 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 text-black py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#e3006e] text-white hover:bg-pink-800 text-sm"
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
