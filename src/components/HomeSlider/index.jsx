import React from "react";
import { Link } from "react-router-dom";

function HomeSlider() {
  const heroImage =
    "https://res.cloudinary.com/dac4gsvh0/image/upload/v1746817093/MomentoHeroImage_ob164v.jpg";

  return (
    <div className="bg-black flex items-center py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="w-full lg:w-2/5 text-white text-center lg:text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-marcellus leading-snug">
              Elevate Your Photography Journey
            </h1>
            <Link to="/my-account/:userId">
                    <button className="inline-block px-4 py-2 mt-4 text-lg 
                     text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] transition-colors duration-300 font-pt-serif">
                      Join Momento Now
                    </button>
                  </Link>
          </div>

          {/* Image */}
          <div className="w-full lg:w-3/5">
            <div className="aspect-video w-full">
              <img
                src={heroImage}
                alt="Photography showcase"
                className="w-full h-full object-contain shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
