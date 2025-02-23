import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaStar, FaHandshake } from "react-icons/fa"; // Importing icons from React Icons

const BecomeMemberPromo = () => {
  return (
    <div className=" py-16 px-4 md:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto bg-white p-8 md:p-12 shadow-2xl">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center font-marcellus">
          Become a Member
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg md:text-xl text-center mb-12 font-pt-serif">
          Join our community of creative photographers and unlock exclusive benefits.
        </p>

        {/* Bullet Points with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Point 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaCheckCircle className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Full Control
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Retain full copyright of your images and decide which photos to sell. You’re in charge of your creative work.
            </p>
          </div>

          {/* Point 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaStar className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Exclusive Rewards
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Earn rewards for your creativity. Get paid for every sale and enjoy special member-only perks.
            </p>
          </div>

          {/* Point 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaHandshake className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Global Exposure
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Showcase your work to a global audience. Reach buyers and photography enthusiasts worldwide.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-block px-8 py-3 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BecomeMemberPromo;