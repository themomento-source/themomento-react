import React from "react";
import { FaRegSun } from "react-icons/fa";

const BecomeMemberPromo = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white flex flex-col md:flex-row items-center justify-center p-8 md:p-16">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-8">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide">
          CAPTURE<br />CONNECT<br />GROW
        </h2>

        <button className="border border-yellow-400 text-yellow-400 px-8 py-3 text-lg font-semibold tracking-wide
         hover:bg-yellow-400 hover:text-black transition duration-300 font-pt-serif">
          JOIN MOMENTO
        </button>

        <div>
          <h3 className="text-4xl font-bold text-yellow-400 font-marcellus">FREE MEMBERSHIP</h3>
        </div>

        <div className="inline-block bg-yellow-400 px-6 py-2 text-black font-bold uppercase tracking-wider font-pt-serif">
          WE OFFER
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
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

      {/* Right Section */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img 
          src="https://res.cloudinary.com/dgob9antb/image/upload/v1742195076/becomeamembertemporary_amn7cl.jpg" 
          alt="Membership" 
          className="w-full h-auto object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default BecomeMemberPromo;