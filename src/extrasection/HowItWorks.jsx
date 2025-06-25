
import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-10 px-4 md:px-16 " data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold text-left text-[#e3006e] mb-8">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
          <img
            src="https://i.postimg.cc/vHhyb334/sign-up-concept-illustration-114360-7965.avif"
            alt="Step 1"
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col items-center">
            <h4 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
              1. Sign Up / Log In
            </h4>
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Create an account in seconds to get started.
            </p>
          </div>
        </div>
        {/* Step 2 */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
          <img
            src="https://i.postimg.cc/jSqs7GL6/businessman-pressing-button-on-touch-260nw-261525635.webp"
            alt="Step 2"
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col items-center">
            <h4 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
              2. Select a Service
            </h4>
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Browse from a wide range of trusted services.
            </p>
          </div>
        </div>
        {/* Step 3 */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
          <img
            src="https://i.postimg.cc/bYRWtdbM/gettyimages-1447358313-612x612.jpg"
            alt="Step 3"
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex flex-col items-center">
            <h4 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
              3. Book & Relax
            </h4>
            <p className="text-gray-500 text-xs md:text-sm text-center">
              Book your service and let the expert handle it!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;