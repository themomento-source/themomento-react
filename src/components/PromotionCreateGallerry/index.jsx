import React from "react";
import { Link } from "react-router-dom";
import { FaImages, FaHandshake, FaTicketAlt, FaComments, FaBullhorn, FaShieldAlt } from "react-icons/fa"; // Importing icons from React Icons

const CreateGalleryPromo = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 md:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto">
        {/* Text and Button Section */}
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-marcellus">
            Become a Member
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 font-marcellus">
            Elevate Your Photography Journey: Join Momento Now!
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl mb-12 leading-relaxed font-pt-serif">
            At Momento, we’re dedicated to empowering photographers around the world by offering opportunities that help you grow, connect, and succeed. Whether you’re just starting out or already an experienced photographer, becoming a member opens doors to exclusive benefits that help you sharpen your craft, gain exposure, and build a successful photography career.
          </p>

          {/* Bullet Points with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Point 1 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaImages className="text-4xl text-[#FFCB00]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                Free Portfolio Gallery
              </h3>
              <p className="text-gray-600 text-base font-pt-serif">
                As a member, you’ll receive a free, professional portfolio gallery on our website. This gallery will serve as your personal portfolio to showcase your best work to potential clients, collaborators, and the Momento community.
              </p>
            </div>

            {/* Point 2 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaHandshake className="text-4xl text-[#FFCB00]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                Photography Assignments and Clients
              </h3>
              <p className="text-gray-600 text-base font-pt-serif">
                Gain access to exclusive photography assignments and connect with global clients for commercial and creative projects.
              </p>
            </div>

            {/* Point 3 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaTicketAlt className="text-4xl text-[#FFCB00]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                Exclusive Discounts
              </h3>
              <p className="text-gray-600 text-base font-pt-serif">
                Enjoy discounts on exhibition submissions, tickets, and workshops to enhance your skills and exposure.
              </p>
            </div>

            {/* Point 4 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaComments className="text-4xl text-[#FFCB00]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                Expert Reviews and Feedback
              </h3>
              <p className="text-gray-600 text-base font-pt-serif">
                Receive personalized feedback and professional advice to improve your craft and grow as a photographer.
              </p>
            </div>

            {/* Point 5 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaBullhorn className="text-4xl text-[#FFCB00]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                Networking and Exposure
              </h3>
              <p className="text-gray-600 text-base font-pt-serif">
                Connect with a global community of photographers, share feedback, collaborate, and have your work showcased on Momento's platforms.
              </p>
            </div>

            {/* Point 6 */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-4xl text-[#FFCB00]" />
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
          <div className="mb-12">
            <p className="text-gray-600 text-base md:text-lg font-pt-serif">
              Membership is open to photographers of all levels. No membership fee is required to join and access all benefits.
            </p>
          </div>

          {/* Button */}
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

export default CreateGalleryPromo;