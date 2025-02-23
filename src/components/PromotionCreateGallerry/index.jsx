import React from "react";
import { Link } from "react-router-dom";
import { FaImages, FaUserCircle, FaBullhorn } from "react-icons/fa"; // Importing icons from React Icons

const CreateGalleryPromo = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 md:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text and Button Section */}
        <div className="text-center md:text-left">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-marcellus">
            Create Your Free Gallery
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed font-pt-serif">
            Showcase your work, build your portfolio, and grow your brand with our free gallery service.
          </p>

          {/* Bullet Points with Icons */}
          <div className="space-y-6 mb-12">
            {/* Point 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaImages className="text-4xl text-[#FFCB00] mr-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Personal Portfolio
                </h3>
                <p className="text-gray-600 text-base font-pt-serif">
                  Display your best work in a professional gallery. Perfect for showcasing your talent to clients and collaborators.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaUserCircle className="text-4xl text-[#FFCB00] mr-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Personal Branding
                </h3>
                <p className="text-gray-600 text-base font-pt-serif">
                  Use your gallery as a powerful branding tool. Customize it to reflect your unique style and vision.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaBullhorn className="text-4xl text-[#FFCB00] mr-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Free Advertisement
                </h3>
                <p className="text-gray-600 text-base font-pt-serif">
                  Promote your work to a global audience. Share your gallery link and attract potential clients.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <Link
            to="/create-gallery"
            className="inline-block px-8 py-3 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] 
            transition-colors duration-300"
          >
            Create Gallery Now
          </Link>
        </div>

        {/* Gallery Demo Image Section */}
        <div className="order-first md:order-last">
          <img
            src="https://res.cloudinary.com/dgob9antb/image/upload/v1739633242/submissions/67aa4612ad68d426b18dda28/approved/jumioiy5vq7cyhzw9lwi.jpg"
            alt="Gallery Demo"
            className="w-full h-auto shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGalleryPromo;