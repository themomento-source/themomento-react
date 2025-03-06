import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaStar, FaHandshake, FaCamera, FaUsers, FaComments, FaTicketAlt, FaShieldAlt } from "react-icons/fa"; // Importing icons from React Icons

const BecomeMemberPromo = () => {
  return (
    <div className="py-16 px-4 md:px-8">
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
          Elevate Your Photography Journey: Join Momento Now!
        </p>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg text-center mb-12 font-pt-serif">
          At Momento, we’re dedicated to empowering photographers around the world by offering opportunities that help you grow, connect, and succeed. Whether you’re just starting out or already an experienced photographer, becoming a member opens doors to exclusive benefits that help you sharpen your craft, gain exposure, and build a successful photography career.
        </p>

        {/* Bullet Points with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Point 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaCamera className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Free Portfolio Gallery
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Showcase your best work with a free, professional portfolio gallery. Use it to attract clients, collaborators, and gain visibility.
            </p>
          </div>

          {/* Point 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Photography Assignments and Clients
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Access exclusive assignments and connect with global clients for commercial and creative projects.
            </p>
          </div>

          {/* Point 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaTicketAlt className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Exclusive Discounts
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Enjoy discounts on exhibition submissions, tickets, and workshops to enhance your skills and exposure.
            </p>
          </div>

          {/* Point 4 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaComments className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Expert Reviews and Feedback
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Receive personalized feedback and professional advice to improve your craft and grow as a photographer.
            </p>
          </div>

          {/* Point 5 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaHandshake className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Networking and Exposure
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Connect with a global community, collaborate, and have your work showcased on Momento's platforms.
            </p>
          </div>

          {/* Point 6 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaShieldAlt className="text-2xl text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
              Privacy and Security
            </h3>
            <p className="text-gray-600 text-base font-pt-serif">
              Your personal information and photos are safe with us. We respect your privacy and ownership.
            </p>
          </div>
        </div>

        {/* Membership Fee and Eligibility */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-base md:text-lg font-pt-serif mb-4">
            Membership is open to photographers of all levels. No membership fee is required to join and access all benefits.
          </p>
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