import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { fetchDataFromApi } from "../../utils//api.js";

function HomeSlider() {
  const [sliderData, setSliderData] = useState([
    // Static fallback image
    {
      url: "https://res.cloudinary.com/dgob9antb/image/upload/v1742844182/slider/ncihadv9tnucyk0fumlh.jpg",
      title: "Elevate Your Photography Journey",
      isStatic: true
    }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await fetchDataFromApi('/api/slider');
        if (response?.data?.length > 0) {
          // Replace static image with dynamic ones
          const sortedData = response.data
          .sort((a, b) => a.position - b.position)
          .slice(0, 2);
        setSliderData(sortedData);
      }
      } catch (err) {
        console.error("Slider fetch error:", err);
        // Keep static image on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchSlider();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
          // Only autoplay if we have dynamic images
          stopOnLastSlide: sliderData.length === 1 && sliderData[0].isStatic
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper"
        key={sliderData.some(img => !img.isStatic) ? 'dynamic' : 'static'} // Force reinit when data changes
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.public_id || 'static-fallback'}>
            <div className="relative w-full">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-[700px] object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 p-6">
                {/* Show loading spinner only when waiting for dynamic content */}
                {loading && !slide.isStatic && (
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full mb-4"
                       role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                
                <h2 className="text-3xl md:text-5xl font-bold mb-4 font-marcellus">
                  {slide.title}
                </h2>

                {slide.subtitle && (
                  <h3 className="text-lg md:text-2xl font-semibold mb-4 font-marcellus">{slide.subtitle}</h3>
                )}
                
                {/* Fixed Text Lines
                <h3 className="text-lg md:text-2xl font-semibold mb-2 font-marcellus">
                  Submit Now for Today’s Best Click!
                </h3>
                <h3 className="text-lg md:text-2xl font-semibold mb-4 font-marcellus">
                  Join Momento Now!
                </h3> */}

                <div className="flex gap-4">
                  <Link to="/my-account">
                    <button className="inline-block px-4 py-2 mt-4 text-lg font-semibold text-gray-900 bg-[#FFCB00] hover:bg-[#e6b800] transition-colors duration-300">
                      Join Momento Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default HomeSlider;