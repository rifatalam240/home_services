
import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="py-10 px-4 md:px-16" data-aos="fade-up">
      <motion.h2
        animate={{
          color: ["#900C3F","#ff33ca", "#ff3368", "#33ffc7", "#ff5b33", "#ff3349"],
          transition: { duration: 4, repeat: Infinity },
        }}
        className="text-2xl md:text-3xl font-bold text-left text-[#e3006e] mb-8"
      >
        Why Choose Our Services?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-5 hover:shadow-xl transition-shadow duration-300 border border-blue-100">
          <div className="bg-blue-100 rounded-full p-3 mb-3">
            <img
              src="https://i.postimg.cc/76Fr6R2k/pexels-fauxels-3184416.jpg"
              alt="Verified"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <h3 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
            Trusted & Verified
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            All service providers are verified for quality and professionalism.
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-5 hover:shadow-xl transition-shadow duration-300 border border-blue-100">
          <div className="bg-blue-100 rounded-full p-3 mb-3">
            <img
              src="https://i.postimg.cc/4yxN6q3h/istockphoto-637122726-612x612.jpg"
              alt="Support"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <h3 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
            24/7 Support
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            Our team is always here to help you whenever you need assistance.
          </p>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-5 hover:shadow-xl transition-shadow duration-300 border border-blue-100">
          <div className="bg-blue-100 rounded-full p-3 mb-3">
            <img
              src="https://i.postimg.cc/658m8chj/flat-isometric-vector-concept-five-stars-best-rating-customer-feedback-positive-review-winner-award.webp"
              alt="Rating"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <h3 className="font-semibold text-base md:text-lg mb-1 text-blue-700">
            Top Rated Providers
          </h3>
          <p className="text-gray-500 text-xs md:text-sm">
            Only top-rated and well-reviewed professionals are shown.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
