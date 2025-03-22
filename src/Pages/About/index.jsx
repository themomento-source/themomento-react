import React from "react";
import { FaCamera, FaGlobe, FaLightbulb, FaUsers, FaHandshake } from "react-icons/fa"; // Importing icons from React Icons

const AboutMomento = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 px-4 md:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto bg-gray-900 p-8 md:p-12 shadow-lg rounded-lg">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center font-marcellus">
          About Momento
        </h1>

        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl text-center mb-12 font-pt-serif">
          Empowering Photographers, Transforming Lives
        </p>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1: Introduction */}
          <div className="text-center">
            <p className="text-white text-base md:text-lg font-pt-serif leading-relaxed">
              Momento is a UK-based platform with a global reach, dedicated to empowering photographers from around the world. Our mission is to build a society where people, especially the youth, channel their creativity into productive work rather than falling into negative paths like crime. We believe that photography has the power to transform lives, tell stories, and bring about meaningful change.
            </p>
          </div>

          {/* Section 2: Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaLightbulb className="text-3xl text-[black]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus text-center">
                Our Mission
              </h3>
              <p className="text-black text-base font-pt-serif text-center">
                To create a global community where photographers can develop their skills, showcase their work, and inspire positive change through visual storytelling.
              </p>
            </div>
            <div className="bg-amber-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaGlobe className="text-3xl text-[black]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2 font-marcellus text-center">
                Our Vision
              </h3>
              <p className="text-gray-600 text-base font-pt-serif text-center">
                To build a world where creativity is celebrated, and photography becomes a tool for social and personal transformation.
              </p>
            </div>
          </div>

          {/* Section 3: What We Offer */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-marcellus">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Offer 1 */}
              <div className="bg-amber-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FaCamera className="text-3xl text-[black]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Free Portfolio Gallery
                </h3>
                <p className="text-gray-600 text-base font-pt-serif">
                  Showcase your best work with a professional portfolio gallery to attract clients and collaborators.
                </p>
              </div>
              {/* Offer 2 */}
              <div className="bg-amber-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FaUsers className="text-3xl text-[black]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Global Community
                </h3>
                <p className="text-black font-pt-serif">
                  Connect with photographers worldwide, share feedback, and grow together.
                </p>
              </div>
              {/* Offer 3 */}
              <div className="bg-amber-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FaHandshake className="text-3xl text-[black]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 font-marcellus">
                  Exclusive Opportunities
                </h3>
                <p className="text-gray-600 text-base font-pt-serif">
                  Access photography assignments, client opportunities, and expert feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-marcellus">
              Join the Movement
            </h2>
            <p className="text-white text-base md:text-lg font-pt-serif mb-8">
              Whether you are an aspiring photographer or a seasoned professional, Momento provides the tools, community, and opportunities you need to thrive. Join us today and be part of a creative movement that is changing the world, one photo at a time.
            </p>
            <button className="inline-block px-8 py-3 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] transition-colors duration-300">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMomento;