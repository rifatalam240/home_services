import React from "react";
import { useAllContext } from "../context/AllContext";
import axios from "axios";
import Swal from "sweetalert2";

const Addservice = () => {
  const { user, loading } = useAllContext();
  console.log(user.accessToken);
  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    const { serviceName, serviceImage, price, serviceArea, description } = data;

    const servicedata = {
      serviceName,
      serviceImage,
      price: Number(price),
      serviceArea,
      description,
      providerName: user.displayName,
      providerEmail: user.email,
      providerImage: user.photoURL,
    };
    // console.log(servicedata);

    axios
      .post(
        "https://b11a11-server-side-rifatalam240-l6pcmu5k2.vercel.app/addservice",
        servicedata,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "added Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-2xl pt-10 mx-auto mt-24 mb-10 p-5 shadow-lg rounded-lg bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-5 text-left text-gray-400">
        🛠️ Add a New Service
      </h2>
      <form onSubmit={handleAddService} className="space-y-4">
        <input
          type="text"
          name="serviceName"
          placeholder="Service Name"
          required
          className="input input-bordered w-full"
        />
        <input
          type="url"
          name="serviceImage"
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (৳)"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="serviceArea"
          placeholder="Service Area (e.g. Dhaka, Comilla)"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Service Description"
          required
          className="textarea textarea-bordered w-full"
          rows="4"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default Addservice;
