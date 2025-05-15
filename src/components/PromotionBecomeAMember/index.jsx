import React, { useState } from "react";
import { FaRegSun } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";

const BecomeMemberPromo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center p-8 md:p-16">
      {/* Container for centered content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-8 text-left mb-10 md:mb-0 md:pr-12">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide text-gray-900">
            CAPTURE<br />CONNECT<br />GROW
          </h2>
          <Link to="/my-account/:userId">  
            <button className="border border-gray-800 text-gray-600 px-8 py-3 text-lg font-semibold tracking-wide
              hover:bg-amber-200 hover:text-black transition duration-300 font-pt-serif mt-6">
              JOIN MOMENTO NOW
            </button>
          </Link>
          <div>
            <h3 className="text-4xl font-bold text-gray-800 font-marcellus">FREE MEMBERSHIP</h3>
          </div>

          <div className="inline-block bg-amber-200 px-6 py-2 text-black font-bold uppercase tracking-wider font-pt-serif">
            WE OFFER
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6 flex-wrap">
            <div className="flex items-center">
              <FaRegSun className="text-yellow-400 text-2xl mr-2" />
              <span className="text-lg font-medium">FREE GALLERY</span>
            </div>
            <div className="flex items-center">
              <FaRegSun className="text-yellow-400 text-2xl mr-2" />
              <span className="text-lg font-medium">Expert Reviews</span>
            </div>
            <div className="flex items-center">
              <FaRegSun className="text-yellow-400 text-2xl mr-2" />
              <span className="text-lg font-medium">Exclusive Discounts</span>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <div className="max-w-[600px] w-full cursor-pointer">
            <img 
              src="https://res.cloudinary.com/dac4gsvh0/image/upload/v1747300331/drilldown_222_1_bie9gg.jpg" 
              alt="Membership" 
              className="w-full h-auto object-cover shadow-lg hover:opacity-90 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              className="absolute -top-8 right-0 text-white hover:text-amber-200 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes className="text-3xl" />
            </button>
            <img
              src="https://res.cloudinary.com/dac4gsvh0/image/upload/v1747300331/drilldown_222_1_bie9gg.jpg"
              alt="Membership Full Size"
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeMemberPromo;